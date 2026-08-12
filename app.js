let selectedGoal="Financial freedom";
const steps=[
["BREATHE","Slow down. Take a deep breath in… and let it go.","There is nowhere else you need to be right now."],
["BELIEVE","I am capable of creating extraordinary results.","Say it slowly. Let yourself believe it."],
["REPEAT","I trust myself to make powerful decisions.","Your future is built one decision at a time."],
["VISUALIZE","Picture the life you're working toward.","See it clearly. Feel what it would be like to live it."],
["ACT","What is one thing you can do today?","Your manifestation becomes powerful when you take action."]
];
let step=0;
function showScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 document.querySelectorAll(".navitem").forEach(n=>n.classList.remove("active"));
 const map={today:0,manifest:1,journal:2,streakScreen:3,profile:4};
 const i=map[id]; if(i!==undefined)document.querySelectorAll(".navitem")[i].classList.add("active");
 window.scrollTo({top:0,behavior:"smooth"});
}
function choose(el,g){document.querySelectorAll(".choices button").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");selectedGoal=g}
function createManifest(){
 const goal=document.getElementById("goal").value.trim()||selectedGoal;
 const text=`I am creating a life aligned with ${goal.toLowerCase()}. I trust myself to recognize opportunities, take consistent action, and become the person capable of sustaining the success I desire. I do not need everything figured out today. I only need to move forward with intention.`;
 const box=document.getElementById("generated");box.classList.remove("hidden");box.innerHTML=`<div class="eyebrow">YOUR PERSONAL MANIFESTATION</div><h2>${text}</h2><button class="primary" onclick="startSession()">REPEAT THIS MANIFESTATION →</button>`;
}
function startSession(){step=0;renderStep();showScreen("session")}
function renderStep(){
 const s=steps[step];document.getElementById("stepLabel").textContent=`STEP ${step+1} OF ${steps.length}`;document.getElementById("sessionEyebrow").textContent=s[0];document.getElementById("sessionText").textContent=s[1];document.getElementById("sessionSub").textContent=s[2];
 document.getElementById("timer").textContent=step===0?"00:30":"00:20";
}
function nextStep(){if(step<steps.length-1){step++;renderStep()}else{let n=Number(localStorage.getItem("manifestStreak")||12)+1;localStorage.setItem("manifestStreak",n);document.getElementById("streak").textContent=n;document.getElementById("streakBig").textContent=n;showScreen("today")}}
function saveJournal(){localStorage.setItem("manifestJournal",document.getElementById("journalText").value);document.getElementById("saved").textContent="Saved. Come back tonight and read it again."}
function init(){
 const saved=localStorage.getItem("manifestJournal");if(saved)document.getElementById("journalText").value=saved;
 const n=Number(localStorage.getItem("manifestStreak")||12);document.getElementById("streak").textContent=n;document.getElementById("streakBig").textContent=n;
 const cal=document.getElementById("calendar");for(let i=0;i<28;i++){const x=document.createElement("i");if(i>=16)x.className="done";cal.appendChild(x)}
}
init();

let deferredInstall=null;
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault(); deferredInstall=e;
  const b=document.getElementById("installBtn"); if(b)b.hidden=false;
});
document.addEventListener("click",e=>{
  if(e.target.id==="installBtn" && deferredInstall){
    deferredInstall.prompt();
    deferredInstall.userChoice.finally(()=>{deferredInstall=null;e.target.hidden=true});
  }
});
