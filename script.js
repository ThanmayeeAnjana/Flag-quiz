const countries = [
  { name: "India", flag: "india.png" },
  { name: "USA", flag: "usa.png" },
  { name: "France", flag: "france.png" },
  { name: "Germany", flag: "germany.png" },
  { name: "Japan", flag: "japan.png" },
  { name: "Brazil", flag: "brazil.png" },
  { name: "Italy", flag: "italy.png" },
  { name: "Canada", flag: "canada.png" },
  { name: "Australia", flag: "australia.png" },
  { name: "Russia", flag: "russia.png" },
  { name: "China", flag: "china.png" },
  { name: "UK", flag: "uk.png" },
  { name: "Spain", flag: "spain.png" },
  { name: "Mexico", flag: "mexico.png" },
  { name: "South Africa", flag: "south_africa.png" },
  { name: "Argentina", flag: "argentina.png" },
  { name: "South Korea", flag: "south_korea.png" },
  { name: "Netherlands", flag: "netherlands.png" },
  { name: "Turkey", flag: "turkey.png" },
  { name: "Sweden", flag: "sweden.png" }
];

const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const quizContainer = document.getElementById('quiz-container');
const scoreDisplay = document.getElementById('score');

let currentQuestion = {};
let score = 0;
let round1Score = 0;
let round2Score = 0;
let questionCount = 0;
let currentRound = 1; // 1 or 2
const totalQuestions = 10;

let roundCountries = [];
const round1 = countries.slice(0, 10);
const round2 = countries.slice(10, 20);

function getRandomCountries(correct, pool) {
  let options = [correct];
  while (options.length < 4) {
    let random = pool[Math.floor(Math.random() * pool.length)];
    if (!options.includes(random)) {
      options.push(random);
    }
  }
  return options.sort(() => 0.5 - Math.random());
}

function generateQuestion() {
  quizContainer.innerHTML = '';

  if (questionCount >= totalQuestions) {
    showFinalScore();
    return;
  }

  const correct = roundCountries[questionCount];
  const options = getRandomCountries(correct, roundCountries);

  currentQuestion = { correct, options };

  const flagImg = document.createElement('img');
  flagImg.src = correct.flag;
  flagImg.alt = "Guess the flag";
  flagImg.classList.add("flag-question");
  quizContainer.appendChild(flagImg);

  const feedback = document.createElement('p');
  feedback.id = 'feedback';
  feedback.style.fontWeight = 'bold';
  feedback.style.marginTop = '15px';
  quizContainer.appendChild(feedback);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.name;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(opt.name, feedback);
    quizContainer.appendChild(btn);
  });

  questionCount++;
}

function checkAnswer(selected, feedbackEl) {
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);

  if (selected === currentQuestion.correct.name) {
    score++;
    if (currentRound === 1) round1Score++;
    else round2Score++;

    scoreDisplay.textContent = `Score: ${score}`;
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct: ${currentQuestion.correct.name}`;
    feedbackEl.style.color = "red";
  }

  nextBtn.style.display = 'inline-block';

  if (questionCount >= totalQuestions) {
    nextBtn.textContent = (currentRound === 1) ? "👉 Start Round 2" : "🔄 Restart Quiz";
  } else {
    nextBtn.textContent = "Next ➡️";
  }
}

function showFinalScore() {
  if (currentRound === 1) {
    quizContainer.innerHTML = `
      <h2>🎉 Round 1 Complete!</h2>
      <p>Round 1 Score: <b>${round1Score} / ${totalQuestions}</b></p>
      <p>Total so far: <b>${round1Score} / 10</b></p>
    `;
  } else {
    let finalScore = round1Score + round2Score;
    quizContainer.innerHTML = `
      <h2>🏆 Quiz Complete!</h2>
      <p style="font-size:18px;">Round 1 Score: <b>${round1Score} / 10</b></p>
      <p style="font-size:18px;">Round 2 Score: <b>${round2Score} / 10</b></p>
      <p style="font-size:24px; margin-top:12px; font-weight:bold; color:darkblue;">
        Final Score: ${finalScore} / 20
      </p>
    `;
  }

  nextBtn.textContent = (currentRound === 1) ? "👉 Start Round 2" : "🔄 Restart Quiz";
  nextBtn.style.display = 'inline-block';

  scoreDisplay.textContent = `Score: ${score}`;
}

nextBtn.onclick = () => {
  if (questionCount >= totalQuestions) {
    if (currentRound === 1) {

      currentRound = 2;
      questionCount = 0;
      roundCountries = round2;
      nextBtn.style.display = 'none';
      generateQuestion();
    } else {

  let finalScore = round1Score + round2Score;
  let percentage = Math.round((finalScore / 20) * 100);
  
  let message = "";
  if (percentage === 100) {
    message = "🌟 Outstanding! Perfect Score!";
  } else if (percentage >= 80) {
    message = "🎉 Great job! You really know your flags!";
  } else if (percentage >= 50) {
    message = "👍 Good effort! Keep practicing!";
  } else {
    message = "💡 Don’t worry, try again and you’ll improve!";
  }

  quizContainer.innerHTML = `
    <h2>🏆 Quiz Complete!</h2>
    <p style="font-size:18px;">Round 1 Score: <b>${round1Score} / 10</b></p>
    <p style="font-size:18px;">Round 2 Score: <b>${round2Score} / 10</b></p>
    <p style="font-size:24px; margin-top:12px; font-weight:bold; color:darkblue;">
      Final Score: ${finalScore} / 20
    </p>
    <p style="font-size:20px; margin-top:8px; color:green;">
      Percentage: ${percentage}%
    </p>
    <p style="margin-top:10px; font-size:18px; font-style:italic; color:purple;">
      ${message}
    </p>
    <p style="margin-top:15px;">Click Start to play again!</p>
  `;
  
  nextBtn.style.display = "none";
  startBtn.style.display = "inline-block";
}
  } else {
    nextBtn.style.display = 'none';
    generateQuestion();
  }
};

startBtn.onclick = () => {
  score = 0;
  round1Score = 0;
  round2Score = 0;
  questionCount = 0;
  currentRound = 1;
  roundCountries = round1;
  
  startBtn.style.display = 'none';
  scoreDisplay.textContent = `Score: ${score}`;
  generateQuestion();
};
