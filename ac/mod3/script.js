let questions = [];
let currentQuestionIndex = 0;

const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const feedback = document.getElementById('feedback');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');

// Fetch questions from JSON file
async function fetchQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        loadQuestion();
        totalQuestionsSpan.textContent = questions.length;
    } catch (error) {
        console.error('Error fetching questions:', error);
        questionText.textContent = "Failed to load questions. Please try again.";
    }
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = '';
    feedback.textContent = '';
    submitBtn.disabled = true;
    nextBtn.style.display = 'none';

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <label>
                <input type="radio" name="option" value="${option}">
                <span>${option}</span>
            </label>
        `;
        optionsList.appendChild(li);
    });

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // Enable submit button when an option is selected
    document.querySelectorAll('input[name="option"]').forEach(input => {
        input.addEventListener('change', () => {
            submitBtn.disabled = false;
        });
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
        feedback.innerHTML = `<span class="correct">Correct!</span> Reference: ${currentQuestion.reference}`;
    } else {
        feedback.innerHTML = `<span class="incorrect">Incorrect.</span> The correct answer is "${currentQuestion.answer}". Reference: ${currentQuestion.reference}`;
    }

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

submitBtn.addEventListener('click', checkAnswer);

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        submitBtn.style.display = 'block';
    } else {
        questionText.textContent = "Quiz Completed!";
        optionsList.innerHTML = '';
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        feedback.textContent = "Thank you for taking the quiz!";
    }
});

// Load questions on page load
fetchQuestions();