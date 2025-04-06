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
        answer: ["&lt;header&gt;", "&lt;article&gt;", "&lt;section&gt;"]
    }
];

// Function to load the quiz onto the page
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ""; // Reset the quiz container

    // Loop through each question in quizData to generate quiz elements dynamically
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

        // If it is a fill-in-the-blank question
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

    // Add the submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = "Submit Quiz";
    submitButton.id = "submit-btn";
    submitButton.onclick = submitQuiz;
    quizContainer.appendChild(submitButton);

    // Add restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = "Restart Quiz";
    restartButton.onclick = restartQuiz;
    quizContainer.appendChild(restartButton);
}

// Function to submit the quiz and calculate the score
function submitQuiz() {
    let score = 0;
    const totalQuestions = quizData.length;
    const results = [];

    // Loop through each question to check if the answers are correct
    quizData.forEach((item, index) => {
        let userAnswer = [];
        
        if (item.type === "multiple") {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            if (selected && selected.value === item.answer) {
                score++;
                results.push(`Question ${index + 1}: Correct`);
            } else {
                results.push(`Question ${index + 1}: Incorrect`);
            }
        }
        
        if (item.type === "text") {
            const input = document.querySelector(`input[name="question${index}"]`);
            if (input && input.value.trim().toLowerCase() === item.answer.toLowerCase()) {
                score++;
                results.push(`Question ${index + 1}: Correct`);
            } else {
                results.push(`Question ${index + 1}: Incorrect`);
            }
        }
        
        if (item.type === "checkbox") {
            const selectedCheckboxes = document.querySelectorAll(`input[name="question${index}"]:checked`);
            selectedCheckboxes.forEach((checkbox) => userAnswer.push(checkbox.value));

            const correctAnswers = item.answer.sort();
            userAnswer.sort();
            
            if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswers)) {
                score++;
                results.push(`Question ${index + 1}: Correct`);
            } else {
                results.push(`Question ${index + 1}: Incorrect`);
            }
        }
    });

    // Display the final score and result for each question
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `You scored ${score} out of ${totalQuestions}<br><br>`;

    // Display individual results
    results.forEach((result) => {
        resultElement.innerHTML += `${result}<br>`;
    });

    // Pass/Fail Logic
    const passScore = totalQuestions * 0.7; // Passing score is 70%
    if (score >= passScore) {
        resultElement.innerHTML += `<br>You have passed the quiz!`;
    } else {
        resultElement.innerHTML += `<br>You have failed the quiz.`;
    }
}

// Function to restart the quiz
function restartQuiz() {
    loadQuiz();
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Clear the results
}

window.onload = loadQuiz;