const questions = [
    {
        question: "Who has won the most Grand Slam men's singles titles?",
        options: [
            "Roger Federer",
            "Rafael Nadal",
            "Novak Djokovic",
            "Andy Murray"
        ],
        answer: "Novak Djokovic"
    },

    {
        question: "Which tournament is played on a grass court?",
        options: [
            "French Open",
            "Wimbledon",
            "US Open",
            "Australian Open"
        ],
        answer: "Wimbledon"
    },

    {
        question: "How many points are needed to win a normal tennis game (without deuce)?",
        options: [
            "3",
            "4",
            "5",
            "6"
        ],
        answer: "4"
    },

    {
        question: "Who is known as the 'King of Clay'?",
        options: [
            "Novak Djokovic",
            "Roger Federer",
            "Rafael Nadal",
            "Carlos Alcaraz"
        ],
        answer: "Rafael Nadal"
    },

    {
        question: "How many players are there in a singles tennis match?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        answer: "2"
    },

    {
        question: "Which country hosts the Australian Open?",
        options: [
            "England",
            "USA",
            "Australia",
            "France"
        ],
        answer: "Australia"
    },

    {
        question: "What is the score called when both players have 40 points?",
        options: [
            "Match Point",
            "Deuce",
            "Set Point",
            "Break Point"
        ],
        answer: "Deuce"
    },

    {
        question: "Who won the 2022 US Open men's singles title?",
        options: [
            "Carlos Alcaraz",
            "Daniil Medvedev",
            "Rafael Nadal",
            "Novak Djokovic"
        ],
        answer: "Carlos Alcaraz"
    },

    {
        question: "Which player is close to completing a Double Career Golden Slam in tennis?",
        options: [
            "Roger Federer",
            "Rafael Nadal",
            "Iga Swiatek",
            "Carlos Alcaraz"
        ],
        answer: "Carlos Alcaraz"
    },

    {
        question: "Which player is considered close to completing a Career Golden Masters achievement after Novak Djokovic?",
        options: [
            "John Isner",
            "Jannik Sinner",
            "Iga Swiatek",
            "Carlos Alcaraz"
        ],
        answer: "Carlos Alcaraz"
    }
];


let currentQuestion = 0;
let score = 0;
let time = 120;
let timer;


// DOM Elements
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerDisplay = document.getElementById("timer");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");


// Start Timer
function startTimer() {

    timer = setInterval(() => {

        time--;

        timerDisplay.innerHTML = "Time Left: " + time + "s";

        if (time <= 0) {
            clearInterval(timer);
            finishQuiz();
        }

    }, 1000);

}


// Load Question
function loadQuestion() {

    let q = questions[currentQuestion];

    question.innerHTML = q.question;

    options.innerHTML = "";


    q.options.forEach(option => {

        let button = document.createElement("button");

        button.innerHTML = option;

        button.classList.add("option");


        button.onclick = function () {

            if (option === q.answer) {
                score++;
            }

            disableButtons();

        };


        options.appendChild(button);

    });

}


// Disable buttons after answer
function disableButtons() {

    let buttons = document.querySelectorAll(".option");

    buttons.forEach(button => {

        button.disabled = true;

    });

}


// Next Question
nextBtn.onclick = function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } 
    else {

        finishQuiz();

    }

};

function finishQuiz() {

    clearInterval(timer);

    quiz.classList.add("hide");

    result.classList.remove("hide");

    scoreDisplay.innerHTML =
        "Your Score: " + score + "/" + questions.length;

}


// Start Quiz
loadQuestion();
startTimer();