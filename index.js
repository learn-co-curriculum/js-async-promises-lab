// get a random question
function getQuestion(questions) {
  return questions[Math.floor(Math.random() * questions.length)];
}

function trueAndFalseButtons() {
  return (btns = document
    .querySelector(".true-false-list")
    .querySelectorAll(".btn"));
}

function showTrueAndFalseButtons() {
  trueAndFalseButtons().forEach(function(btn) {
    btn.classList.remove("hide");
  });
}

function hideTrueAndFalseButtons() {
  trueAndFalseButtons().forEach(function(btn) {
    btn.classList.add("hide");
  });
}

function checkQuestion(question, answer) {
  question.questionAnswer == answer;
}

function appendQuestion(question) {
  let container = document.querySelector(".question-container");
  container.innerHTML = question.questionText;
}

function removeQuestion() {
  let container = document.querySelector(".question-container");
  container.innerHTML = "";
}

function askQuestionThen(question, time) {
  appendQuestion(question);
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(question);
    }, time);
  });
}

function askQuestionThenRemoveQuestion(questions, time) {
  let question = getQuestion(questions);
  return askQuestionThen(question, time).then(removeQuestion);
}

function attachAskAwayListener() {
  let btn = document.querySelector("#ask-away");
  return btn.addEventListener("click", () => {
    showTrueAndFalseButtons();
    askQuestionThenRemoveQuestion(questions, 5000).then(
      hideTrueAndFalseButtons
    );
  });
}
