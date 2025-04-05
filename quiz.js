// Array of quiz questions, each with a question, list of options, and correct answer index
const questions = [
    {
        question: "Which of the following is a strong password?",
        options: ["password123", "123456", "P@ssw0rd!2025", "qwerty"],
        answer: 2
    },
    {
        question: "What is phishing?",
        options: [
            "A technique used to catch fish",
            "A way to hack passwords using brute force",
            "A social engineering attack to steal sensitive info",
            "An email service provider"
        ],
        answer: 2
    },
    {
        question: "Which protocol is used to securely browse websites?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        answer: 2
    },
    {
        question: "What should you do if you receive a suspicious email?",
        options: [
            "Open it to see what it is",
            "Click the link to verify",
            "Forward it to everyone",
            "Report and delete it"
        ],
        answer: 3
    }
];

// Function to dynamically build and load quiz questions into the page
function loadQuiz() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = ""; // Clear any previous content

    // Loop through each question and create HTML elements
    questions.forEach((q, index) => {
        const div = document.createElement("div"); // Container for each question
        div.classList.add("question");

        const questionElem = document.createElement("p"); // Question text
        questionElem.textContent = `${index + 1}. ${q.question}`;
        div.appendChild(questionElem);

        // Create a radio input for each answer option
        q.options.forEach((option, optIndex) => {
            const label = document.createElement("label");
            const input = document.createElement("input");

            input.type = "radio";
            input.name = `question${index}`; // Group radios by question index
            input.value = optIndex; // Set value for comparison

            label.appendChild(input); // Add radio input to label
            label.append(` ${option}`); // Add the option text
            div.appendChild(label);
            div.appendChild(document.createElement("br")); // Line break between options
        });

        container.appendChild(div); // Add the question block to the quiz container
    });
}

// Function to handle quiz submission and display results
function submitQuiz() {
    let score = 0;

    // Check each answer
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
            score++; // Increment score for correct answers
        }
    });

    // Display the final score
    const result = document.getElementById("result");
    result.innerHTML = `<h3>You scored ${score} out of ${questions.length}.</h3>`;
}

// Load the quiz as soon as the window finishes loading
window.onload = loadQuiz;
