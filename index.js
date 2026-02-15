// Students & race
let students = [];
let positions = [];
let winnerIndex = null;
const questions = [
    { q: "What is 5 + 3?", a: "8" },
    { q: "What is 10 - 4?", a: "6" },
    { q: "What is 4 x 2?", a: "8" },
    { q: "What is 12 ÷ 3?", a: "4" }
];
let currentQuestion;

// Add/edit/remove students
function addStudent(){
    const name = document.getElementById("studentName").value.trim();
    if(!name) return;
    students.push(name);
    document.getElementById("studentName").value = "";
    renderStudents();
}
function renderStudents(){
    const list = document.getElementById("studentsList");
    list.innerHTML = "";
    students.forEach((s,i)=>{
        list.innerHTML += `<div class="student-item">
            <input type="text" value="${s}" onchange="editStudent(${i}, this.value)">
            <button onclick="removeStudent(${i})">❌</button>
        </div>`;
    });
}
function editStudent(i,newName){ students[i]=newName; }
function removeStudent(i){ students.splice(i,1); renderStudents(); }

// Start race
function startRace() {

  const ducks = document.querySelectorAll(".duck");
  const finishLine = document.querySelector(".finish-line");
  const finishLinePosition = finishLine.offsetLeft;

  const interval = setInterval(() => {

    ducks.forEach(duck => {

      let currentLeft = parseInt(duck.style.left) || 0;
      let moveStep = Math.floor(Math.random() * 15) + 5; // random speed
      duck.style.left = currentLeft + moveStep + "px";

      if (currentLeft + moveStep >= finishLinePosition - 50) {
        clearInterval(interval);
        showWinner(duck.dataset.name);
      }

    });

  }, 200);
}

// Race
function runRace(){
    const raceTrack = document.getElementById("raceTrack");
    const finishLine = raceTrack.offsetWidth - 50;
    const duckSound = document.getElementById("duckSound");

    const interval = setInterval(()=>{
        if(winnerIndex!==null){
            clearInterval(interval);
            showWinner();
            return;
        }
        positions.forEach((pos,i)=>{
            if(winnerIndex!==null) return;
            const step = 1 + Math.random()*2; // slower movement
            positions[i]+=step;
            const duckContainer = document.getElementById("duckContainer"+i);
            if(duckContainer) duckContainer.style.left = positions[i]+"px";

            // Random quack
            if(Math.random()<0.02){
                duckSound.currentTime=0;
                duckSound.play().catch(e=>console.log("Duck sound blocked",e));
            }

            if(positions[i]>=finishLine && winnerIndex===null){
                winnerIndex=i;
            }
        });
    },100);
}

// Winner
function showWinner(){
    document.getElementById("winnerText").textContent="🏆 "+students[winnerIndex]+" reached the finish line first!";
    launchCelebration();
 const sound = document.getElementById("victorySound");
    if(sound){ sound.currentTime=0; sound.play().catch(e=>console.log(e)); }

    document.getElementById("questionBox").style.display="block";
    nextQuestion();
}

// Questions
function nextQuestion(){
    currentQuestion = questions[Math.floor(Math.random()*questions.length)];
    document.getElementById("questionText").innerHTML = students[winnerIndex]+", "+currentQuestion.q;
}
function checkAnswer(){
    const answer=document.getElementById("answerInput").value.trim();
    if(answer===currentQuestion.a) alert("Correct! 🎉");
    else alert("Wrong! ✖ Correct answer is "+currentQuestion.a);
    document.getElementById("questionBox").style.display="none";
}

// Celebration
function launchCelebration(){
    const celebration=document.getElementById("celebration");
    const container=document.querySelector(".confetti-container");
    celebration.style.display="flex";
    container.innerHTML="";
    for(let i=0;i<60;i++){
        const confetti=document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left=Math.random()*100+"vw";
        confetti.style.backgroundColor=["red","yellow","blue","green","orange","pink","purple"][Math.floor(Math.random()*7)];
        confetti.style.animationDuration=2+Math.random()*3+"s";
        container.appendChild(confetti);
    }
    setTimeout(()=>{ celebration.style.display="none"; },5000);

}
