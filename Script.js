 let questions = [
  { question: "2 + 2?", options: ["2", "4", "6", "8"], answer: 1 },
  { question: "Capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: 1 },
  { question: "5 * 2?", options: ["5", "10", "15", "20"], answer: 1 },
  { question: "Sun rises from?", options: ["West", "East", "North", "South"], answer: 1 },
  { question: "HTML stands for?", options: ["Hyper Tool", "Hyper Text Markup Language", "Home Tool", "None"], answer: 1 },
  { question: "CSS used for?", options: ["Logic", "Design", "Database", "Server"], answer: 1 },
  { question: "JS is?", options: ["Language", "Style", "Database", "None"], answer: 0 },
  { question: "10/2?", options: ["2", "3", "5", "8"], answer: 2 },
  { question: "India PM?", options: ["Modi", "Rahul", "Kejriwal", "None"], answer: 0 },
  { question: "Water formula?", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1 }
];

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 10;

// 🎵 Sounds
const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

function loadQuestion() {
  const q = questions[currentQ];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.innerText = opt;

    btn.onclick = () => selectAnswer(index, btn);

    optionsDiv.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("time").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(index, element) {
  clearInterval(timer);

  const correctIndex = questions[currentQ].answer;
  const options = document.querySelectorAll(".option");

  options.forEach((opt, i) => {
    if (i === correctIndex) {
      opt.style.background = "green";
    }
  });

  if (index === correctIndex) {
    score++;
    element.style.background = "green";
    correctSound.play();
  } else {
    element.style.background = "red";
    wrongSound.play();
  }

  // disable clicking
  options.forEach(opt => opt.onclick = null);

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQ++;

  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector(".quiz-container").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText = score + "/10";
}

loadQuestion();

