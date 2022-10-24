// A quiz app using open travia db API

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

const totalquestions = 5;

let currentQuizno = 0;
let score = 0;
let correctAnswer;

// function for loading quizdata from UPI
const loadQuiz = async ()=> {
  try{
    deselectAnswers();

    const APIUrl =
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
  
    displayQuestions(data.results[currentQuizno]);
  }catch (error){
    console.log(error)
  }
  
}

loadQuiz();



// function to display questions and options
const displayQuestions = (UpiData) => {
  let incorrectAnswer = UpiData.incorrect_answers;
  let optionsList = incorrectAnswer;

  // inserting right answer randomly between options
  let randomIndexofCorrectAnswer = Math.floor(
    Math.random() * (incorrectAnswer.length + 1) 
  );
  optionsList.splice(randomIndexofCorrectAnswer, 0, UpiData.correct_answer);

  questionEl.innerText =`${currentQuizno+1}/5. ${UpiData.question}` ;
  a_text.innerText = optionsList[0];
  b_text.innerText = optionsList[1];
  c_text.innerText = optionsList[2];
  d_text.innerText = optionsList[3];

  correctAnswer = randomIndexofCorrectAnswer;
  console.log(UpiData.correct_answer)
};

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
// getting the selected answers
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer == correctAnswer) {
      score++;
    }

    currentQuizno++;

    if (currentQuizno < totalquestions) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
                <h2>You answered ${score}/${totalquestions} questions correctly</h2>
                <button class="btn btn-primary btn-lg btn-sm btn-hover m-1" onclick="location.reload()">Reload</button>
            `;
    }
  }
});
