const questions = [
    {
        question: "Which language is mainly used to create web pages?",
        options: ["Python", "HTML", "Java", "SQL"],
        answer: "HTML"
    },

    {
        question: "Which symbol is used for a single-line comment in Python?",
        options: ["//", "#", "/*", "--"],
        answer: "#"
    },

    {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "fun", "define"],
        answer: "def"
    },

    {
        question: "Which data type is used to store True or False?",
        options: ["String", "Integer", "Boolean", "Float"],
        answer: "Boolean"
    },

    {
        question: "Which loop is commonly used to iterate through a list in Python?",
        options: ["for", "repeat", "loop", "iterate"],
        answer: "for"
    },

    {
        question: "Which language is used to query databases?",
        options: ["HTML", "CSS", "SQL", "Python"],
        answer: "SQL"
    }
];

let currentQuestion = 0;
let score = 0;
let time = 30;
let timer;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerDisplay = document.getElementById("timer");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");

function loadQuestion() {

    clearInterval(timer);

    let q = questions[currentQuestion];

    question.innerHTML = q.question;
    options.innerHTML = "";

    q.options.forEach(function(option) {

        let button = document.createElement("button");

        button.innerHTML = option;
        button.classList.add("option");

        button.onclick = function() {

            if (option === q.answer) {
               score += 2;
            }

            button.style.backgroundColor = "green";
            button.style.color = "white";

            disableButtons();
        };

        options.appendChild(button);
    });

    startTimer();
}

function startTimer() {

    time = 30;
    timerDisplay.innerHTML = "Time Left: 30s";

    timer = setInterval(function() {

        time--;

        timerDisplay.innerHTML = "Time Left: " + time + "s";

        if (time <= 0) {
            clearInterval(timer);
            nextQuestion();
        }

    }, 1000);
}

function disableButtons() {

    let buttons = document.querySelectorAll(".option");

    buttons.forEach(function(button) {
        button.disabled = true;
    });
}

function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

nextBtn.onclick = function() {
    nextQuestion();
};

function finishQuiz() {

    clearInterval(timer);

    quiz.classList.add("hide");
    result.classList.remove("hide");

   scoreDisplay.innerHTML =
    "Your Score: " + score + "/" + (questions.length * 2);
   
}

loadQuestion();