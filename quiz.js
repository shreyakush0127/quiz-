const questions = [
    {
        question: "What is my Birthdate?",
        answers: [
            { text: "27-March", correct: true },
            { text: "17-March", correct: false },
            { text: "07-March", correct: false },
            { text: "23-March", correct: false }
        ]
    },
    {
        question: "What is my favorite thing to do?",
        answers: [
            { text: "To Talk to you", correct: true },
            { text: "Sleeping", correct: false },
            { text: "Cooking", correct: false },
            { text: "Eating", correct: false }
        ]
    },
    {
        question: "What is your Birthdate?",
        answers: [
            { text: "05-October", correct: true },
            { text: "17-March", correct: false},
            { text: "9-March", correct: false },
            { text: "23 October", correct: false }
        ]
    },
    {
        question: "What is the thing I love the most in you?",
        answers: [
            { text: "Your hair", correct: false },
            { text: "Your behavior", correct: true },
            { text: "Nothing", correct: false },
            { text: "Looks", correct: false }
        ]
    },
    {
        question: "What is the smallest thing you hate in me?",
        answers: [
            { text: "My Talkativness", correct: false },
            { text: "My Anger", correct: true },
            { text: "My Nature", correct: false },
            { text: "My over irritating behavior", correct: false }
        ]
    },
    {
        question: "What makes me happy?",
        answers: [
            { text: "Cute surprises", correct: false },
            { text: "Tasty Food", correct: false },
            { text: "Spending time with close one", correct: true },
            { text: "I never get happy", correct: false }
        ]
    }
];

const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz() {
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showquestion();
}

function showquestion() {
    resetState();
    let currentquestion = questions[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionelement.innerHTML = questionno + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetState() {
    nextbutton.style.display = "none";
    while (answerbutton.firstChild) {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showscore() {
    resetState();
    questionelement.innerHTML =  ` CONGRATULATIONS!!!  You Scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play again";
    nextbutton.style.display = "block";
}

function handlenextbutton() {
    currentquestionindex++;
    if (currentquestionindex < questions.length) {
        showquestion();
    } else {
        showscore();
    }
}

nextbutton.addEventListener("click", () => {
    if (currentquestionindex < questions.length) {
        handlenextbutton();
    } else {
        startquiz();
    }
});

startquiz();
