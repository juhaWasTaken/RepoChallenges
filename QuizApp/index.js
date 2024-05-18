const questions = [
    {
        question: "En qué fecha fue el primer beso con Claudia?", 
        answers: [
            { text: "15 de noviembre 2022", correct: true },
            { text: "22 de noviembre 2022", correct: false },
            { text: "18 de noviembre 2022", correct: false },
            { text: "2 de diciembre 2022", correct: false },
        ]
    }, 
    {
        question: "Cuál es el color favorito de Claudia?",
        answers: [
            {text: "Azul", correct: false},
            {text: "Amarillo", correct: false},
            {text: "Rosa", correct: false},
            {text: "Lila", correct: true},
        ]
    },
    {
        question: "Cuándo es el cumpleaños de Claudia?",
        answers: [
            { text: "2 de agosto", correct: false},
            { text: "27 de septiembre", correct: false},
            { text: "11 de noviembre", correct: true},
            { text: "6 de febrero", correct: false},
        ]
    }, 
    {
        question: "Cuándo es el aniversario de la relación?",
        answers: [
            { text: "1 de septiembre", correct: false},
            { text: "6 de febrero", correct: true},
            { text: "14 de febrero", correct: false},
            { text: "12 de diciembre", correct: false},
        ]
    }
];

const questionElement = document.getElementById('question');
const answersButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Siguiente';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answersButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answersButtons.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Tu puntuación es de ${score} de ${questions.length} preguntas.`;
    nextButton.innerHTML = 'Jugar de nuevo';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();    
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length ) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();