let students = [];
let positions = [];
let winnerIndex = null;
let timerInterval;
let timeElapsed = 0;

const questions = [
    { q: "What is 1 + 1?", a: "2" },
    { q: "What is 2 + 1?", a: "3" },
    { q: "What is 3 + 1?", a: "4" },
    { q: "What is 2 + 2?", a: "4" },
    { q: "What is the name of your beautiful teacher?", a: "5" }
];
let currentQuestion;

function addStudent() {
    const name = document.getElementById("studentName").value.trim();
    if (!name) return;
    students.push(name);
    document.getElementById("studentName").value = "";
    renderStudents();
}

function renderStudents() {
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

function startRace(){
    if(students.length===0){ alert("Add at least one student"); return; }

    const raceTrack = document.getElementById("raceTrack");
    const rowHeight = 70;
    raceTrack.style.height = (students.length*rowHeight + 20) + "px";
    raceTrack.innerHTML = `<div class="wave"></div><div class="wave wave2"></div>`;
    positions = [];
    winnerIndex = null;
    timeElapsed = 0;
    clearInterval(timerInterval);

    // Finish line
    const finishLineDiv = document.createElement("div");
    finishLineDiv.id = "finishLine";
    raceTrack.appendChild(finishLineDiv);

    const duckEmojis = ["🦆","🦆","🦆","🦆","🦆","🦆"];
    const colors = ["red","blue","green","orange","purple","pink"];
    const waterColors = ["#4FC3F7","#29B6F6","#03A9F4","#00BCD4","#26C6DA","#4DD0E1","#81D4FA","#0288D1"];
    const nameBgColors = ["#FFB6C1","#FFD700","#ADFF2F","#FFA500","#40E0D0","#DA70D6","#FF6347","#7FFFD4"];

    students.forEach((s,i)=>{
        positions.push(0);

        const waterLane = document.createElement("div");
        waterLane.classList.add("water-lane");
        waterLane.style.top = (i*rowHeight)+"px";
        waterLane.style.background = waterColors[i % waterColors.length];
        raceTrack.appendChild(waterLane);

        const duckContainer = document.createElement("div");
        duckContainer.classList.add("duck-container");
        duckContainer.id = "duckContainer"+i;
        duckContainer.style.top = (i*rowHeight)+"px";
        duckContainer.style.left = "0px";

        const nameLabel = document.createElement("div");
        nameLabel.classList.add("nameLabel");
        nameLabel.id = "nameLabel"+i;
        nameLabel.textContent = s;
        nameLabel.style.background = nameBgColors[i % nameBgColors.length];

        const duck = document.createElement("div");
        duck.classList.add("duck");
        duck.id = "duck"+i;
        duck.textContent = duckEmojis[i % duckEmojis.length];
        duck.style.color = colors[i % colors.length];

        duckContainer.appendChild(nameLabel);
        duckContainer.appendChild(duck);
        raceTrack.appendChild(duckContainer);
    });

    const timerEl = document.getElementById("timer");
    timerInterval = setInterval(()=>{
        timeElapsed++;
        timerEl.textContent = `⏱ ${timeElapsed}s`;
    },1000);

    runRace();
}

// Race function with quack + glow + scale + unique name backgrounds
function runRace(){
    const raceTrack = document.getElementById("raceTrack");
    const finishLine = raceTrack.offsetWidth - 50;
    const duckSound = document.getElementById("duckSound");
    const colors = ["red","blue","green","orange","purple","pink"];

    const interval = setInterval(()=>{
        if(winnerIndex !== null){
            clearInterval(interval);
            clearInterval(timerInterval);
            showWinner();
            return;
        }

        students.forEach((s,i)=>{
            if(winnerIndex!==null) return;
            const step = 2 + Math.random()*4;
            positions[i] += step;

            const duckContainer = document.getElementById("duckContainer"+i);
            const duck = document.getElementById("duck"+i);
            const nameLabel = document.getElementById("nameLabel"+i);

            if(duckContainer && duck && nameLabel){
                duckContainer.style.left = positions[i]+"px";

                if(Math.random() < 0.03){
                    duckSound.currentTime=0;
                    duckSound.play().catch(e=>console.log(e));

                    const originalBg = nameLabel.style.background;
                    const glowColor = colors[i % colors.length];
                    const flashBg = "#"+Math.floor(Math.random()*16777215).toString(16);

                    duck.style.transform="scale(1.4) rotateY(180deg)";
                    duck.style.textShadow=`0 0 15px ${glowColor}, 0 0 25px ${glowColor}`;
                    nameLabel.style.background=flashBg;

                    setTimeout(()=>{
                        duck.style.transform="scale(1) rotateY(180deg)";
                        duck.style.textShadow="0 0 0px transparent";
                        nameLabel.style.background=originalBg;
                    },300);
                }

                if(positions[i]>=finishLine) winnerIndex=i;
            }
        });
    },100);
}

function showWinner(){
    document.getElementById("winnerText").innerHTML = "🏆 "+students[winnerIndex]+" reached the dock first!";
    const sound = document.getElementById("victorySound");
    if(sound){ sound.currentTime=0; sound.play().catch(e=>console.log(e)); }
    document.getElementById("questionBox").style.display="block";
    nextQuestion();
    launchCelebration();
}

function nextQuestion(){
    currentQuestion = questions[Math.floor(Math.random()*questions.length)];
    document.getElementById("questionText").textContent = students[winnerIndex]+", "+currentQuestion.q;
}

function checkAnswer(){
    const answer = document.getElementById("answerInput").value.trim().toLowerCase();
    const correctAnswer = currentQuestion.a.toLowerCase();
    if(answer===correctAnswer){ alert("Correct! 🎉"); }
    else{ alert("Oops! Correct answer: "+currentQuestion.a); }
    document.getElementById("questionBox").style.display="none";
    document.getElementById("answerInput").value="";
}

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
