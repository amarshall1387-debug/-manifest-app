const DAILY_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    identity: { type: "string" },
    manifestation: { type: "string" },
    affirmations: { type: "array", minItems: 4, maxItems: 6, items: { type: "string" } },
    visualization: { type: "string" },
    action_title: { type: "string" },
    action_detail: { type: "string" },
    journal_prompt: { type: "string" },
    future_message: { type: "string" }
  },
  required: ["identity","manifestation","affirmations","visualization","action_title","action_detail","journal_prompt","future_message"]
};

function outputText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  for (const item of (data.output || [])) {
    for (const c of (item.content || [])) {
      if (typeof c.text === "string") return c.text;
    }
  }
  return "";
}

function trimContext(value, max=1500) {
  if (value == null) return "";
  return String(value).slice(0,max);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"POST required"});
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({error:"OPENAI_API_KEY is not configured in Vercel."});

  try {
    const body = req.body || {};
    const mode = body.mode === "coach" ? "coach" : "daily";
    const c = body.context || {};

    const safeContext = {
      name: trimContext(c.name,80),
      focus: trimContext(c.focus,100),
      goal: trimContext(c.goal,1200),
      score: Number(c.score || 0),
      recentAction: trimContext(c.recentAction,600),
      recentReflection: trimContext(c.recentReflection,900),
      tomorrow: trimContext(c.tomorrow,600),
      proofs: Array.isArray(c.proofs) ? c.proofs.slice(0,8).map(x=>trimContext(x,300)) : []
    };

    const instructions = `You are MANIFEST, an encouraging future-self and behavior-change coach.
Your purpose is to help the user connect a desired future identity to concrete, achievable action today.

Voice:
- premium, calm, motivational, concise
- grounded rather than mystical
- never promise that thoughts magically cause external events
- do not use shame, fear, certainty, or manipulative dependency
- affirmations should be believable, first-person, and action-oriented
- actions should usually take 5â30 minutes and be specific
- do not present yourself as a therapist, doctor, lawyer, or financial adviser
- if a goal touches money, health, relationships, or career, keep guidance general and practical
- do not claim access to information not provided

The product philosophy is:
VISION â IDENTITY â ACTION â EVIDENCE â BELIEF.

Use the user's recent evidence and reflections when helpful, but never expose private context as if surveilling them.`;

    let payload;

    if (mode === "coach") {
      const question = trimContext(body.question,2000);
      payload = {
        model: "gpt-5.6",
        reasoning: { effort: "low" },
        instructions,
        input: `User context:
${JSON.stringify(safeContext)}

User asks MANIFEST:
${question}

Answer in 2â5 concise paragraphs. Be useful and end with one concrete next move when appropriate.`
      };
    } else {
      payload = {
        model: "gpt-5.6",
        reasoning: { effort: "low" },
        instructions,
        input: `Create today's personalized Becoming Engine experience from this context:
${JSON.stringify(safeContext)}

Make it feel fresh, specific, motivating, and connected to the user's stated future. Avoid generic inspirational clichÃ©s.`,
        text: {
          format: {
            type: "json_schema",
            name: "manifest_daily",
            strict: true,
            schema: DAILY_SCHEMA
          }
        }
      };
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI error", data);
      return res.status(response.status).json({error:data?.error?.message || "AI request failed"});
    }

    const text = outputText(data);
    if (!text) return res.status(502).json({error:"No AI output returned."});

    if (mode === "daily") {
      let parsed;
      try { parsed = JSON.parse(text); }
      catch { return res.status(502).json({error:"AI returned invalid structured output."}); }
      return res.status(200).json({ok:true, daily:parsed});
    }

    return res.status(200).json({ok:true, answer:text});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error:"MANIFEST AI is temporarily unavailable."});
  }
}
