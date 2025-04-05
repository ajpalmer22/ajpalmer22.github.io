// Array to hold the quiz questions, options, and answers
const quizData = [
    {
        question: "Which HTML5 element is used to define navigation links?",
        options: ["<nav>", "<header>", "<footer>", "<section>"],
        answer: "<nav>" // Correct answer
    },
    {
        question: "What does SEO stand for?",
        options: ["Search External Optimization", "Search Engine Optimization", "Structured Engine Optimization", "Software Engine Optimization"],
        answer: "Search Engine Optimization" // Correct answer
    },
    {
        question: "Which HTML5 element is used for embedding audio?",
        options: ["<audio>", "<video>", "<embed>", "<object>"],
        answer: "<audio>" // Correct answer
    },
    {
        question: "What is the primary purpose of SEO?",
        options: ["Increase website traffic", "Make a website mobile-friendly", "Enhance website security", "Improve website design"],
        answer: "Increase website traffic" // Correct answer
    },
    {
        question: "Which of the following is a feature of HTML5?",
        options: ["Native multimedia support", "ActiveX controls", "Flash player integration", "Java applets"],
        answer: "Native multimedia support" // Correct answer
    }
];

// Function to dynamically load quiz questions and options onto the page
function loadQuiz() {
    // Getting the quiz container to insert the quiz questions
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ""; // Clear any existing content

    // Looping through the quiz data array to create questions and options
    quizData.forEach((item, index) => {
        // Creating a container for each question
        const questionElement = document.createElement('div');
        questionElement.classList.add('question'); // Adding class for styling

        // Creating the question text element
        const questionText = document.createElement('p');
        questionText.textContent = item.question;

        // Creating a list for the options
        const optionsList = document.createElement('ul');
        item.options.forEach((option, i) => {
            // Creating each option as a list item
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="radio" name="question${index}" id="question${index}-option${i}" value="${option}">
                <label for="question${index}-option${i}">${option}</label>
            `;
            optionsList.appendChild(listItem); // Adding the option to the list
        });

        // Appending the question text and options list to the question container
        questionElement.appendChild(questionText);
        questionElement.appendChild(optionsList);
        // Adding the entire question block to the main quiz container
        quizContainer.appendChild(questionElement);
    });
}

// Function to check the user's answers and calculate the score
function submitQuiz() {
    let score = 0; // Initialize score variable to keep track of correct answers

    // Loop through the quiz data to compare the selected options with the correct answer
    quizData.forEach((item, index) => {
        // Get the selected option for the current question
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        // If the selected option matches the correct answer, increment the score
        if (selectedOption && selectedOption.value === item.answer) {
            score++;
        }
    });

    // Display the result to the user
    const resultElement = document.getElementById('result');
    resultElement.textContent = `You scored ${score} out of ${quizData.length}`;
}

// Calling loadQuiz() when the page loads to populate the quiz questions
window.onload = loadQuiz;
