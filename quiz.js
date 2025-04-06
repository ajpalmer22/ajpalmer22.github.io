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

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = "";

    quizData.forEach((item, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question-block');

        const questionText = document.createElement('p');
        questionText.textContent = item.question;
        questionElement.appendChild(questionText);

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

        if (item.type === "text") {
            const input = document.createElement('input');
            input.type = "text";
            input.name = `question${index}`;
            input.placeholder = "Type your answer here";
            questionElement.appendChild(input);
        }

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

function submitQuiz() {
    let score = 0;

    quizData.forEach((item, index) => {
        if (item.type === "multiple") {
            const selected = document.querySelector(`input[name="question${index}"]:checked`);
            if (selected && selected.value === item.answer) score++;
        }

        if (item.type === "text") {
            const input = document.querySelector(`input[name="question${index}"]`);
            if (input && input.value.trim().toLowerCase() === item.answer.toLowerCase()) score++;
        }

        if (item.type === "checkbox") {
            const selected = document.querySelectorAll(`input[name="question${index}"]:checked`);
            const selectedValues = Array.from(selected).map(cb => cb.value);
            const correct = item.answer;

            // Check if selected matches correct (both must contain same items)
            if (
                selectedValues.length === correct.length &&
                selectedValues.every(val => correct.includes(val))
            ) {
                score++;
            }
        }
    });

    const resultElement = document.getElementById('result');
    resultElement.textContent = `You scored ${score} out of ${quizData.length}`;
}

window.onload = loadQuiz;
