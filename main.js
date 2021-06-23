//intiating the consts for the script
const problem= document.querySelector(".problem")
const form = document.querySelector(".form")
const inputBox = document.querySelector(".field")
const pointsRequired = document.querySelector(".pointsrequired")
const mistakesAllowed = document.querySelector(".mistakesallowed")
const progressBar = document.querySelector(".progressinside")
const outcome = document.querySelector(".outcome")
const reset = document.querySelector(".reset")

//setting the score state
let state = {
  score: 0,
  wrongAnswers: 0
}

//to create the question given to the user
function updateQuestion() {
  state.currentQuestion = generateQuestion()
  problemElement.innerHTML = `${state.currentQuestion.numberOne} ${state.currentQuestion.operator} ${state.currentQuestion.numberTwo}`
  inputBox.value = ""
  inputBox.focus()
}

//creating an update to the question 
updateProblem()

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

//create the question by generating numbers between 0 and 10
function generateQuestion() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

    //checking if the answer is correct or not
  let correctAnswer
  const p = state.currentQuestion
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
    updateProblem()
    renderProgressBar()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
  }
  checkLogic()
}

function checkLogic() {
  // if you win
  if (state.score === 10) {
    endMessage.textContent = "Congrats! You won."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 331)
  }

  // if you lose
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry! You lost."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 331)
  }
}

resetButton.addEventListener("click", resetGame)

//creating a input to start the game again
function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}