//global variables

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
var time = 60
var timer = document.querySelector(".timer")


//timer function

function startTimer() {
    interval = setInterval(function() {
        time--;
        timer.innerHTML = "Time: " + time;

        if (time <= 0) {
            endQuiz()
        }
    }, 1000);
}

startTimer()

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

let questions = [
    {
        question: 'The condition in an if / else statement is enclosed with:',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parentheses',
        choice4: 'square brackets',
        answer: 3,
    },
    {
        question: 'Commonly used data types do NOT include:',
        choice1: 'strings',
        choice2: 'booleans',
        choice3: 'alerts',
        choice4: 'numbers',
        answer: 3,
    },
    {
        question: 'Arrays in JavaScript can be used to store:',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 4,
    },
    {
        question: 'String values must be enclosed within __ when being assigned to variables.',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'commas',
        choice4: 'parentheses',
        answer: 1,
    }

]


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        directToEndPage();
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false 
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
            time = (time - 10)
            alert("Incorrect - you lost 10 seconds!")
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

//function to clear interval and direct to end page
function endQuiz() {
    clearInterval(interval)
    directToEndPage()
}

//score calculator function
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

//send user to end page

function directToEndPage() {
    window.location.assign("../end.html")
}

//start game function
startGame()

