let students = [];
let positions = [];
let winnerIndex = null;
let timerInterval;
let raceInterval;
let timeElapsed = 0;

// `let` rather than `const` — loadQuestions() reassigns this from localStorage
let questions = [
    { q: "What is 1 + 1?", a: "2" },
    { q: "What is 2 + 1?", a: "3" },
    { q: "What is 3 + 1?", a: "4" },
    { q: "What is 2 + 2?", a: "4" },
    { q: "What is 5 + 1?", a: "6" },
    { q: "What is 4 + 1?", a: "5" },
    { q: "What is 1 + 3?", a: "4" },
    { q: "What is 0 + 1?", a: "1" },
    { q: "What is 5 + 2?", a: "7" },
    { q: "What is 6 + 1?", a: "7" },
    { q: "What is 3 + 2?", a: "5" },

    { q: "How many eyes do you have?", a: "2" },
    { q: "How many legs does a dog have?", a: "4" },
    { q: "How many ears do you have?", a: "2" },
    { q: "How many noses do you have?", a: "1" },

    { q: "What color is the sky?", a: "blue" },
    { q: "What color is the sun?", a: "yellow" },
    { q: "What color is grass?", a: "green" },
    { q: "What color is a banana?", a: "yellow" },
    { q: "What color is an apple?", a: "red" },

    { q: "What sound does a duck make?", a: "quack" },
    { q: "What sound does a cat make?", a: "meow" },
    { q: "What sound does a dog make?", a: "bark" },
    { q: "What sound does a cow make?", a: "moo" },
    { q: "What sound does a pig make?", a: "oink" },
    { q: "What sound does the wind make?", a: "whoosh" },

    { q: "What comes after 1?", a: "2" },
    { q: "What comes after 2?", a: "3" },
    { q: "What comes after 3?", a: "4" },
    { q: "What comes after 4?", a: "5" },
    { q: "What comes after 5?", a: "6" },

    { q: "What shape is a ball?", a: "circle" },
    { q: "What shape has 3 sides?", a: "triangle" },
    { q: "What shape has 4 equal sides?", a: "square" },
    { q: "How many letters are in the alphabet in Filipino do we have?", a: "28" },

    { q: "How many fingers on one hand?", a: "5" },
    { q: "How many days are in a week?", a: "7" },

    {
      q: "What is the name of your beautiful teacher?",
      a: ["grace", "ms grace", "teacher grace"]
    }
];

// Kept so "Restore defaults" has something to restore to
const DEFAULT_QUESTIONS = questions.slice();

let currentQuestion;


// ═══════════════════════════════════════════
// STUDENTS
// ═══════════════════════════════════════════

function addStudent() {
    const input = document.getElementById("studentName");
    const name  = input.value.trim();

    if (!name) return;

    students.push(name);
    input.value = "";
    input.focus();
    renderStudents();
}

// Built with createElement rather than innerHTML: a name containing a quote
// or angle bracket is stored as text, not parsed as markup
function renderStudents() {
    const list = document.getElementById("studentsList");
    list.innerHTML = "";

    students.forEach((s, i) => {
        const row = document.createElement("div");
        row.className = "student-item";

        const input = document.createElement("input");
        input.type  = "text";
        input.value = s;
        input.addEventListener("change", () => editStudent(i, input.value));

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.title = "Remove " + s;
        removeBtn.addEventListener("click", () => removeStudent(i));

        row.appendChild(input);
        row.appendChild(removeBtn);
        list.appendChild(row);
    });
}

function editStudent(i, newName) {
    students[i] = newName.trim();
}

function removeStudent(i) {
    students.splice(i, 1);
    renderStudents();
}


// ═══════════════════════════════════════════
// RACE
// ═══════════════════════════════════════════

// Clears the track and results but keeps the student list, so a class can
// race repeatedly without retyping every name
function resetRace() {
    clearInterval(timerInterval);
    clearInterval(raceInterval);

    positions   = [];
    winnerIndex = null;
    timeElapsed = 0;

    document.getElementById("timer").textContent = "⏱ 0s";
    document.getElementById("winnerText").textContent = "";
    document.getElementById("questionBox").style.display = "none";
    document.getElementById("answerInput").value = "";
    document.getElementById("celebration").style.display = "none";

    const raceTrack = document.getElementById("raceTrack");
    raceTrack.innerHTML = `<div class="wave"></div><div class="wave wave2"></div>`;
    raceTrack.style.height = "";
}

// Clears the race AND the student list — for starting with a different group.
// Separate from resetRace() so racing the same class again doesn't lose
// twenty names the teacher just typed.
function clearAll() {
    if (students.length > 0) {
        if (!confirm("Remove all students and start over?")) return;
    }

    resetRace();

    students = [];
    renderStudents();

    document.getElementById("studentName").focus();
}

function startRace() {
    if (students.length === 0) {
        alert("Add at least one student");
        return;
    }

    // Without this, clicking Start twice would leave two intervals running
    // and every duck would move at double speed
    resetRace();

    const raceTrack = document.getElementById("raceTrack");

    // Lanes grow on a classroom screen so ducks and names stay readable
    // from the back of the room. Capped so a huge display doesn't produce
    // one enormous lane when only two children are racing.
    const rowHeight = window.innerWidth >= 1600 ? 130
                    : window.innerWidth >= 1200 ? 100
                    : 70;

    raceTrack.style.height = (students.length * rowHeight + 20) + "px";

    const finishLineDiv = document.createElement("div");
    finishLineDiv.id = "finishLine";
    raceTrack.appendChild(finishLineDiv);

    const colors       = ["red", "blue", "green", "orange", "purple", "pink"];
    const waterColors  = ["#4FC3F7","#29B6F6","#03A9F4","#00BCD4","#26C6DA","#4DD0E1","#81D4FA","#0288D1"];
    const nameBgColors = ["#FFB6C1","#FFD700","#ADFF2F","#FFA500","#40E0D0","#DA70D6","#FF6347","#7FFFD4"];

    students.forEach((s, i) => {
        positions.push(0);

        const waterLane = document.createElement("div");
        waterLane.classList.add("water-lane");
        waterLane.style.top    = (i * rowHeight) + "px";
        waterLane.style.height = rowHeight + "px";
        waterLane.style.background = waterColors[i % waterColors.length];
        raceTrack.appendChild(waterLane);

        const duckContainer = document.createElement("div");
        duckContainer.classList.add("duck-container");
        duckContainer.id = "duckContainer" + i;
        duckContainer.style.top  = (i * rowHeight) + "px";
        duckContainer.style.left = "0px";

        const nameLabel = document.createElement("div");
        nameLabel.classList.add("nameLabel");
        nameLabel.id = "nameLabel" + i;
        nameLabel.textContent = s;
        nameLabel.style.background = nameBgColors[i % nameBgColors.length];

        const duck = document.createElement("div");
        duck.classList.add("duck");
        duck.id = "duck" + i;
        duck.textContent = "🦆";
        duck.style.color = colors[i % colors.length];

        duckContainer.appendChild(nameLabel);
        duckContainer.appendChild(duck);
        raceTrack.appendChild(duckContainer);
    });

    const timerEl = document.getElementById("timer");
    timerInterval = setInterval(() => {
        timeElapsed++;
        timerEl.textContent = `⏱ ${timeElapsed}s`;
    }, 1000);

    runRace();
}

// Every duck advances by a random amount each tick. The race is deliberately
// not a test of ability — the question afterwards is the winner's prize,
// not the thing that decides who wins.
function runRace() {
    const raceTrack  = document.getElementById("raceTrack");
    const finishLine = raceTrack.offsetWidth - 50;
    const duckSound  = document.getElementById("duckSound");
    const colors     = ["red", "blue", "green", "orange", "purple", "pink"];

    raceInterval = setInterval(() => {
        if (winnerIndex !== null) {
            clearInterval(raceInterval);
            clearInterval(timerInterval);
            showWinner();
            return;
        }

        students.forEach((s, i) => {
            if (winnerIndex !== null) return;

            positions[i] += 2 + Math.random() * 4;

            const duckContainer = document.getElementById("duckContainer" + i);
            const duck          = document.getElementById("duck" + i);
            const nameLabel     = document.getElementById("nameLabel" + i);

            if (!duckContainer || !duck || !nameLabel) return;

            duckContainer.style.left = positions[i] + "px";

            // Roughly a 3% chance per tick — an occasional quack and flash
            if (Math.random() < 0.03) {
                duckSound.currentTime = 0;
                duckSound.play().catch(e => console.log(e));

                const originalBg = nameLabel.style.background;
                const glowColor  = colors[i % colors.length];
                const flashBg    = "#" + Math.floor(Math.random() * 16777215).toString(16);

                duck.style.transform  = "scale(1.4) rotateY(180deg)";
                duck.style.textShadow = `0 0 15px ${glowColor}, 0 0 25px ${glowColor}`;
                nameLabel.style.background = flashBg;

                setTimeout(() => {
                    duck.style.transform  = "scale(1) rotateY(180deg)";
                    duck.style.textShadow = "0 0 0px transparent";
                    nameLabel.style.background = originalBg;
                }, 300);
            }

            if (positions[i] >= finishLine) winnerIndex = i;
        });
    }, 100);
}

function showWinner() {
    document.getElementById("winnerText").textContent =
        "🏆 " + students[winnerIndex] + " reached the dock first!";

    const sound = document.getElementById("victorySound");
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log(e));
    }

    document.getElementById("questionBox").style.display = "block";
    nextQuestion();
    launchCelebration();
}


// ═══════════════════════════════════════════
// QUESTIONS
// ═══════════════════════════════════════════

function nextQuestion() {
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById("questionText").textContent =
        students[winnerIndex] + ", " + currentQuestion.q;
}

function checkAnswer() {
    const answerInput   = document.getElementById("answerInput");
    const answer        = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestion.a;

    // A question can accept one answer or several — five-year-olds phrase
    // things in more than one way
    const isCorrect = Array.isArray(correctAnswer)
        ? correctAnswer.includes(answer)
        : answer === correctAnswer.toLowerCase();

    if (isCorrect) {
        alert("Correct! 🎉");
        document.getElementById("questionBox").style.display = "none";
        answerInput.value = "";
    } else {
        // Stays open so "try again" is actually true
        alert("Oops! Try again 😊");
        answerInput.value = "";
        answerInput.focus();
    }
}


// ═══════════════════════════════════════════
// QUESTION EDITOR
// ═══════════════════════════════════════════

// Teacher-added questions persist in the browser, so they survive a reload
// without anyone needing to edit the JavaScript
function loadQuestions() {
    const saved = localStorage.getItem("duckRaceQuestions");

    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                questions = parsed;
            }
        } catch (e) {
            console.warn("Saved questions were unreadable — using defaults");
        }
    }

    renderQuestions();
}

function saveQuestions() {
    localStorage.setItem("duckRaceQuestions", JSON.stringify(questions));
}

function addQuestion() {
    const qInput = document.getElementById("newQuestion");
    const aInput = document.getElementById("newAnswer");

    const q = qInput.value.trim();
    const a = aInput.value.trim().toLowerCase();

    if (!q || !a) {
        alert("Please fill in both the question and the answer");
        return;
    }

    questions.push({ q, a });
    saveQuestions();
    renderQuestions();

    qInput.value = "";
    aInput.value = "";
    qInput.focus();
}

function removeQuestion(i) {
    if (questions.length === 1) {
        alert("Keep at least one question");
        return;
    }

    questions.splice(i, 1);
    saveQuestions();
    renderQuestions();
}

function resetQuestions() {
    if (!confirm("Restore the original questions? Any you added will be removed.")) return;

    questions = DEFAULT_QUESTIONS.slice();
    saveQuestions();
    renderQuestions();
}

function renderQuestions() {
    const list  = document.getElementById("questionList");
    const count = document.getElementById("questionCount");

    if (!list) return;

    count.textContent = questions.length + " question" + (questions.length === 1 ? "" : "s");
    list.innerHTML = "";

    questions.forEach((item, i) => {
        const row = document.createElement("div");
        row.className = "question-row";

        const text = document.createElement("span");
        const answer = Array.isArray(item.a) ? item.a.join(" / ") : item.a;
        text.textContent = item.q + "  →  " + answer;

        const del = document.createElement("button");
        del.textContent = "❌";
        del.title = "Remove this question";
        del.addEventListener("click", () => removeQuestion(i));

        row.appendChild(text);
        row.appendChild(del);
        list.appendChild(row);
    });
}


// ═══════════════════════════════════════════
// CELEBRATION
// ═══════════════════════════════════════════

function launchCelebration() {
    const celebration = document.getElementById("celebration");
    const container   = document.querySelector(".confetti-container");

    celebration.style.display = "flex";
    container.innerHTML = "";

    const confettiColors = ["red","yellow","blue","green","orange","pink","purple"];

    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
        container.appendChild(confetti);
    }

    setTimeout(() => { celebration.style.display = "none"; }, 5000);
}


// ═══════════════════════════════════════════
// START
// ═══════════════════════════════════════════

loadQuestions();

// Enter adds a student, so the teacher can type a whole class without
// reaching for the mouse
document.getElementById("studentName").addEventListener("keydown", e => {
    if (e.key === "Enter") addStudent();
});

// Enter submits the answer too
document.getElementById("answerInput").addEventListener("keydown", e => {
    if (e.key === "Enter") checkAnswer();
});
