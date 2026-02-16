// Students & race
let students = [];
let positions = [];
let winnerIndex = null;
let raceTimer = null;   // will hold the interval
let timeElapsed = 0;    // seconds counter

const questions = [
    { q: "What is 1 + 1?", a: "2" },
    { q: "What is 2 + 1?", a: "3" },
    { q: "What is 3 + 1?", a: "4" },
    { q: "What is 2 + 2?", a: "4" },
    { q: "What is 5 - 1?", a: "4" },
    { q: "How many fingers on one hand?", a: "5" },
    { q: "How many eyes do you have?", a: "2" },
    { q: "How many legs does a dog have?", a: "4" },
    { q: "How many days in one week?", a: "7" },
    { q: "What color is the sky?", a: "blue" },
    { q: "What color is a banana?", a: "yellow" },
    { q: "What color is grass?", a: "green" },
    { q: "What color is an apple?", a: "red" },
    { q: "What sound does a duck make?", a: "quack" },
    { q: "What sound does a dog make?", a: "bark" },
    { q: "What sound does a cat make?", a: "meow" },
    { q: "What comes after 1?", a: "2" },
    { q: "What comes after 2?", a: "3" },
    { q: "What comes after 3?", a: "4" },
    { q: "What shape has 3 sides?", a: "triangle" },
    { q: "What shape is like a ball?", a: "circle" }
];

let currentQuestion;


function startTimer() {
    timeElapsed = 0;
    document.getElementById("timer").textContent = `⏱️ Time: 0s`;

    raceTimer = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").textContent = `⏱️ Time: ${timeElapsed}s`;
    }, 1000); // updates every second
}

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
function startRace(){
    startTimer();


    if(students.length === 0){
        alert("Please add at least one student.");
        return;
    }

    const raceTrack = document.getElementById("raceTrack");
    const rowHeight = 70;
    raceTrack.style.height = (students.length * rowHeight + 20) + "px";

    raceTrack.innerHTML = `<div class="wave"></div><div class="wave wave2"></div>`;

    positions = [];
    winnerIndex = null;

    const finishLineDiv = document.createElement("div");
    finishLineDiv.id = "finishLine";
    raceTrack.appendChild(finishLineDiv);

    const duckEmojis=["🦆","🦆","🦆","🦆","🦆","🦆"];
    const colors=["red","blue","green","orange","purple","pink"];

    students.forEach((s,i)=>{
        positions.push(0);

        const waterColors = ["#4FC3F7","#29B6F6","#03A9F4","#00BCD4","#26C6DA","#4DD0E1","#81D4FA","#0288D1"];

        const waterLane = document.createElement("div");
        waterLane.classList.add("water-lane");
        waterLane.style.top = (i*rowHeight)+"px";
        waterLane.style.background = waterColors[i % waterColors.length];
        raceTrack.appendChild(waterLane);

        const duckContainer = document.createElement("div");
        duckContainer.classList.add("duck-container");
        duckContainer.id = "duckContainer"+i;
        duckContainer.style.top = `${i*rowHeight}px`;
        duckContainer.style.left = "0px";

        const nameLabel = document.createElement("div");
        nameLabel.classList.add("nameLabel");
        nameLabel.textContent = s;

        const duck = document.createElement("div");
        duck.classList.add("duck");
        duck.id = "duck"+i;
        duck.textContent = duckEmojis[i % duckEmojis.length];
        duck.style.color = colors[i % colors.length];

        duckContainer.appendChild(nameLabel);
        duckContainer.appendChild(duck);
        raceTrack.appendChild(duckContainer);
    });

    runRace();
}

// Race
function runRace(){
    const raceTrack = document.getElementById("raceTrack");
    const finishLine = raceTrack.offsetWidth - 50;
    const duckSound = document.getElementById("duckSound");

    const interval = setInterval(()=>{
        if(winnerIndex !== null){
            clearInterval(interval);
            showWinner();
            return;
        }

        students.forEach((s,i)=>{
            if(winnerIndex !== null) return;
            const step = 2 + Math.random()*4;
            positions[i] += step;

            const duckContainer = document.getElementById("duckContainer"+i);
            const duck = document.getElementById("duck"+i);

            if(duckContainer && duck){
                duckContainer.style.left = positions[i]+"px";

                // Random quack
                if(Math.random() < 0.03){
                    // Play sound
                    duckSound.currentTime = 0;
                    duckSound.play().catch(e=>console.log(e));

                    // Duck blink / color animation
                    const originalColor = duck.style.color;
                    duck.style.color = "#FFFF00"; // yellow flash
                    duck.style.transform = "scale(1.3) rotateY(180deg)"; // little pop

                    setTimeout(()=>{
                        duck.style.color = originalColor;
                        duck.style.transform = "scale(1) rotateY(180deg)";
                    }, 300); // revert after 0.3s
                }

                if(positions[i] >= finishLine){
                    winnerIndex = i;
                }
            }
        });
    },100);
}

// Winner & celebration
function showWinner(){

if (raceTimer !== null) {
    clearInterval(raceTimer);
    raceTimer = null;
}


    document.getElementById("winnerText").innerHTML = "🏆 "+students[winnerIndex]+" reached the dock first!";
    launchCelebration();
    const sound = document.getElementById("victorySound");
    if(sound){ sound.currentTime=0; sound.play().catch(e=>console.log(e)); }
    document.getElementById("questionBox").style.display = "block";
    nextQuestion();
}

// Questions
function nextQuestion(){
    currentQuestion = questions[Math.floor(Math.random()*questions.length)];
    document.getElementById("questionText").innerHTML = students[winnerIndex]+", "+currentQuestion.q;
}

function checkAnswer(){
    const answer = document.getElementById("answerInput").value.trim().toLowerCase();
    const correctAnswer = currentQuestion.a.toLowerCase();

    if(answer === correctAnswer){
        alert("Correct! 🎉 Good job!");
    } else {
        alert("Oops! The correct answer is " + currentQuestion.a);
    }

    document.getElementById("questionBox").style.display="none";
    document.getElementById("answerInput").value="";
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
