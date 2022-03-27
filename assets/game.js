//global variables

var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availableQuestions = []
var time = 60
var timer = document.querySelector(".timer")
var SCORE_POINTS = 100
var MAX_QUESTIONS = 4


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


//questions array

var questions = [
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

//start game function
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

//get new question after answer
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        directToEndPage();
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false 
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
            time = (time - 10)

            //for future optimization - append incorrect message to page
                // var answerContainer = document.getElementById("answerContainer")
                // var incorrectAnswer = document.createElement('p')
                // incorrectAnswer.textContent = 'Incorrect'
                // answerContainer.appendChild(incorrectAnswer)
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
    window.location.assign('./end.html')
}

//start game function
startGame()

