const question = document.querySelector('#question');
const choices = Array.from(document.querySelector('#question'));
const progessText = document.querySelector('#projectText');

let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "How many keys are on a piano?",
        choice1: "88",
        choice2: "76",
        choice3: "66",
        choice4: "90",
        answer: "1",
    },
    {
        question: "What year was Beethoven born?",
        choice1: "1690",
        choice2: "1676",
        choice3: "1770",
        choice4: "1773",
        answer: "3",
    },
    {
        question: "What instrument was Mozart afraid of?",
        choice1: "flute",
        choice2: "drums",
        choice3: "bagpipes",
        choice4: "trumpet",
        answer: "4",
    },
    {
        question: "What was Chopin's quirk?",
        choice1: "He never drank milk",
        choice2: "He preferred to play in the dark",
        choice3: "He walked everywhere he went",
        choice4: "He loved small dogs",
        answer: "2",
    },
    {
        question: "How old was Beethoven when he died?",
        choice1: "56",
        choice2: "76",
        choice3: "66",
        choice4: "45",
        answer: "1",
    },
]

const maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion ();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionsCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    questions.innerText
}