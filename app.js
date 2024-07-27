const authForm = document.getElementById('authForm');
const authButton = document.getElementById('authButton');
const authMessage = document.getElementById('authMessage');
const toggleAuth = document.getElementById('toggleAuth');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const quiz = document.getElementById('quiz');
const questionDiv = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const nextQuestionButton = document.getElementById('nextQuestion');
const quizResult = document.getElementById('quizResult');
const resultMessage = document.getElementById('resultMessage');
const logoutButton = document.getElementById('logout');

let currentQuestionIndex = 0;
let score = 0;
const questions = [
    { question: "1)  What is the national animal of Pakistan?", answers: ["Camel", "Markhor", "Goat"], correct: 1 },
    { question: "2)  What is the largest ocean?", answers: ["Atlantic", "Indian", "Pacific"], correct: 2 },
    { question: "3)  What is the world's smallest continent?", answers: ["South-America", "Australia", "Antarctica"], correct: 1 },
    { question: "4)  What year was the very first model of the iPhone released?", answers: ["2007", "2004", "2012"], correct: 0 },
    { question: "5)  What is the rarest blood type in humans?", answers: ["AB -ve", "O -ve", "B -ve"], correct: 0 },
    { question: "6)  What is the largest mammal in the world?", answers: ["Giraffe", "The blue whale", "Elephant"], correct: 1 },
    { question: "7)  Who is the captain of Pakistan red ball team?", answers: ["Babar Azam", "Sarfaraz Ahmed", "Shan Masood"], correct: 2 },
    { question: "8)  Which Electronic Components were used in First Generation Computers?", answers: ["Micro-processors", "Transistors", "Vaccum Tubes"], correct: 2 },
    { question: "9)  Which team won the last edition of fifa world cup?", answers: ["France", "Argentina", "Brazil"], correct: 1 },
    { question: "10) Final of 2023 Men's Odi World cup played in which city?", answers: ["Narendra Modi Stadium", "M. Chinnaswamy Stadium", "M.A. Chidambaram Stadium"], correct: 0 },
];

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionDiv.textContent = question.question;
    answersDiv.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersDiv.appendChild(button);
    });
    nextQuestionButton.style.display = 'none';
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        resultMessage.textContent = "Correct!";
        score++;
    } else {
        resultMessage.textContent = `Incorrect! The correct answer was ${questions[correctIndex].answers[correctIndex]}`;
    }
    nextQuestionButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    resultMessage.textContent = `Quiz Finished! Your score: ${score}/${questions.length}`;
    if (score > 5) {
        alert("✔ Pass")
    } else {
        alert("😕 Fail")
    }
    quizResult.style.display = 'block';
    nextQuestionButton.style.display = 'none';
}

authButton.onclick = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        authMessage.textContent = 'Please enter both username and password.';
        return;
    }

    const storedPassword = localStorage.getItem(username);

    if (storedPassword) {
        if (storedPassword === password) {
            authMessage.textContent = '';
            authForm.style.display = 'none';
            quiz.style.display = 'block';
            displayQuestion();
        } else {
            authMessage.textContent = 'Incorrect password.';
        }
    } else {
        localStorage.setItem(username, password);
        authMessage.textContent = 'User registered. Please log in.';
    }
};

toggleAuth.onclick = () => {
    const isSignUp = toggleAuth.textContent === 'Sign Up';
    toggleAuth.textContent = isSignUp ? 'Login' : 'Sign Up';
    authButton.textContent = isSignUp ? 'Sign Up' : 'Login';
    authMessage.textContent = '';
};

nextQuestionButton.onclick = nextQuestion;

logoutButton.onclick = () => {
    authForm.style.display = 'block';
    quiz.style.display = 'none';
    quizResult.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
    localStorage.clear();
};