const question = document.querySelector('#question');
const choice = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');

let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let availableQuestions = [];


//define questions and choices
let questions = [
    {
        question: "How many keys are on a piano?",
        choice1: "88",
        choice2: "76",
        choice3: "66",
        choice4: "90",
        answer: 1,
    },
    {
        question: "What year was Beethoven born?",
        choice1: "1690",
        choice2: "1676",
        choice3: "1770",
        choice4: "1773",
        answer: 3,
    },
    {
        question: "What instrument was Mozart afraid of?",
        choice1: "flute",
        choice2: "drums",
        choice3: "bagpipes",
        choice4: "trumpet",
        answer: 4,
    },
    {
        question: "What was Chopin's quirk?",
        choice1: "He never drank milk",
        choice2: "He preferred to play in the dark",
        choice3: "He walked everywhere he went",
        choice4: "He loved small dogs",
        answer: 2,
    },
    {
        question: "How old was Beethoven when he died?",
        choice1: "56",
        choice2: "76",
        choice3: "66",
        choice4: "45",
        answer: 1,
    },
];

const maxQuestions = 5;

//Timer function
const startTime = 2;
let time = startTime * 60;

const timerEl = document.getElementById('timer');

setInterval(updateTimer, 1000);
function updateTimer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    time = time < 0 ? 0 : time;

    if (time <= 0) {
        clearInterval
    }
};

//Final score will be however much time remains
let score = time



//function to start game and timer
startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    updateTimer();
};



//function to pull new questions and choices
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }

    questionCounter++

    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;

    //randomize question order
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choice.forEach(choice => {
        const number = choice.dataset['number'];

        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

//add styling for correct and incorrect answers
choice.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'incorrect') {
            
            time = time - 20;
}

    selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
}, 10)

    })
});

startGame();





//End of game, enter name and save score
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScoresList = document.querySelector("#highScoresList");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const maxHighScores = 4;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})


//High Score and local storage
highScoresList.innerHTML=
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('');

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
    }

    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(4)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}