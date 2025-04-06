// Updated quizData with different question types
const quizData = [
    {
        type: "multiple", // Single-answer multiple choice
        question: "What does SEO stand for?",
        options: ["Search External Optimization", "Search Engine Optimization", "Structured Engine Optimization", "Software Engine Optimization"],
        answer: "Search Engine Optimization"
    },
    {
        type: "multiple",
        question: "Which of the following is a feature of HTML5?",
        options: ["Native multimedia support", "ActiveX controls", "Flash player integration", "Java applets"],
        answer: "Native multimedia support"
    },
    {
        type: "multiple",
        question: "What is the primary purpose of SEO?",
        options: ["Increase website traffic", "Make a website mobile-friendly", "Enhance website security", "Improve website design"],
        answer: "Increase website traffic"
    },
    {
        type: "text", // Fill-in-the-blank
        question: "What year was HTML created?",
        answer: "1991"
    },
    {
        type: "checkbox", // Multiple-answer
        question: "Which of the following are semantic HTML5 elements? (Select all that apply)",
        options: ["&lt;header&gt;", "&lt;div&gt;", "&lt;article&gt;", "&lt;section&gt;", "&lt;span&gt;"],
        answer: ["<header>", "<article>", "<section>"]
    }
];

// Function to load the quiz onto the page
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = "";

    quizData.forEach((item, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question-block');

        const questionText = document.createElement('p');
        questionText.textContent = item.question;
        questionElement.appendChild(questionText);

        // If the question is a multiple-choice question
        if (item.type === "multiple") {
            const optionsList = document.createElement('ul');
            item.options.forEach((option, i) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <input type="radio" name="question${index}" id="question${index}-option${i}" value="${option}">
                    <label for="question${index}-option${i}">${option}</label>
                `;
                optionsList.appendChild(listItem);
            });
            questionElement.appendChild(optionsList);
        }

        // If it is a fill-in the blank question
        if (item.type === "text") {
            const input = document.createElement('input');
            input.type = "text";
            input.name = `question${index}`;
            input.placeholder = "Type your answer here";
            questionElement.appendChild(input);
        }

        // If the question involves checkboxes (multiple correct answers possible)
        if (item.type === "checkbox") {
            item.options.forEach((option, i) => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="checkbox" name="question${index}" value="${option}"> ${option}
                `;
                questionElement.appendChild(label);
                questionElement.appendChild(document.createElement("br"));
            });
        }

        quizContainer.appendChild(questionElement);
    });
}

// Function to submit the quiz and calculate the score
function submitQuiz() {
    let score = 0;

    // Create elements for results dynamically
    const resultContainer = document.createElement('div');
    const resultTitle = document.createElement('h3');
    resultTitle.textContent = "Your Results:";
    resultContainer.appendChild(resultTitle);

    quizData.forEach((item, index) => {
        let userAnswer = '';
        let correctAnswer = item.answer;

        // Create a block for each question's result
        const questionResultBlock = document.createElement('div');
        questionResultBlock.classList.add('question-result');

        const questionElement = document.createElement('p');
        questionElement.innerHTML = `<strong>Question:</strong> ${item.question}`;
        questionResultBlock.appendChild(questionElement);

        // Multiple-choice question
        if (item.type === "multiple") {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            if (selected) {
                userAnswer = selected.value;
                if (userAnswer === correctAnswer) score++;
            }
        }

        // Text-based answer questions
        if (item.type === "text") {
            const input = document.querySelector(`input[name="question${index}"]`);
            if (input) {
                userAnswer = input.value.trim();
                if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) score++;
            }
        }

        // Checkbox questions (multiple correct answers)
        if (item.type === "checkbox") {
            const selected = document.querySelectorAll(`input[name="question${index}"]:checked`);
            const selectedValues = Array.from(selected).map(cb => cb.value);
            const correct = correctAnswer;

            if (selectedValues.length === correct.length && selectedValues.every(val => correct.includes(val))) {
                score++;
            }
        }

        const userAnswerElement = document.createElement('p');
        userAnswerElement.innerHTML = `<strong>Your answer:</strong> ${userAnswer}`;
        questionResultBlock.appendChild(userAnswerElement);

        const correctAnswerElement = document.createElement('p');
        correctAnswerElement.innerHTML = `<strong>Correct answer:</strong> ${correctAnswer}`;
        questionResultBlock.appendChild(correctAnswerElement);

        const resultElement = document.createElement('p');
        resultElement.innerHTML = `<strong>Result:</strong> ${userAnswer === correctAnswer ? 'Correct' : 'Incorrect'}`;
        questionResultBlock.appendChild(resultElement);

        resultContainer.appendChild(questionResultBlock);
    });

    // Calculate pass/fail (passing score is 4 out of 5)
    const passingScore = 4;
    const passFailResult = score >= passingScore ? 'Pass' : 'Fail';

    // Display the final score, overall result, and individual results
    const finalScoreElement = document.createElement('p');
    finalScoreElement.innerHTML = `<strong>Total Score:</strong> ${score} out of ${quizData.length}`;
    resultContainer.appendChild(finalScoreElement);

    const passFailElement = document.createElement('p');
    passFailElement.innerHTML = `<strong>Overall Result:</strong> ${passFailResult}`;
    resultContainer.appendChild(passFailElement);

    // Append result container to the DOM
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Clear any previous result
    resultElement.appendChild(resultContainer);
}

// Restart the quiz
function restartQuiz() {
    quizData.forEach((item, index) => {
        const selectedRadio = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedRadio) {
            selectedRadio.checked = false;
        }

        const selectedCheckboxes = document.querySelectorAll(`input[name="question${index}"]:checked`);
        selectedCheckboxes.forEach(cb => {
            cb.checked = false;
        });

        const textInput = document.querySelector(`input[name="question${index}"]`);
        if (textInput) {
            textInput.value = '';
        }
    });

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
}

// Calling the loadQuiz function when the window loads
window.onload = loadQuiz;