// Define variables
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');

let questions = []; // Array to store fetched questions
let currentQuestionIndex = 0; // Index of the current question
let score = 0; // Initial score

// Fetch questions from the API and store them in the 'questions' array
function fetchQuestions() {
  const url = 'https://opentdb.com/api.php?amount=5&type=multiple'; // API endpoint for multiple-choice questions

  fetch(url)
    .then(response => response.json())
    .then(data => {
      questions = data.results;
      displayQuestion();
    })
    .catch(error => {
      console.log('Error fetching questions:', error);
    });
}

// Decode HTML entities (e.g., &amp;, &lt;, &gt;)
function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Display a question on the page
function displayQuestion() {
  questionContainer.innerHTML = '';

  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.createElement('h2');
  questionElement.innerText = decodeHTML(currentQuestion.question);
  questionContainer.appendChild(questionElement);

  // Create options for the question
  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  options.sort(() => Math.random() - 0.5); // Randomize the order of options

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const optionElement = document.createElement('button');
    optionElement.innerText = decodeHTML(option);
    optionElement.addEventListener('click', checkAnswer);
    questionContainer.appendChild(optionElement);
    submitButton.removeAttribute('disabled');

  }

  // Clear the selected option
  const selectedOption = questionContainer.querySelector('.selected');
  if (selectedOption) {
    selectedOption.classList.remove('selected');
  }

  // Disable the submit button
  submitButton.disabled = true;
}


// Add event listener to the submit button
submitButton.addEventListener('click', checkAnswer);

// Fetch questions when the page loads
fetchQuestions();




  let correctCount = 0; // Variable to store the count of correct answers
let incorrectCount = 0; // Variable to store the count of incorrect answers


// Check the selected answer
function checkAnswer(event) {
    const selectedOption = event.target;
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;
  
    const optionElements = questionContainer.getElementsByTagName('button');
    for (let i = 0; i < optionElements.length; i++) {
      optionElements[i].disabled = true;
      optionElements[i].classList.remove('selected');
    }
  
    selectedOption.disabled = false;
    selectedOption.classList.add('selected');
  
    submitButton.disabled = false; // Enable the submit button
  
    // Display the correct answer
    const options = questionContainer.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
      if (options[i].innerText === decodeHTML(correctAnswer)) {
        options[i].classList.add('correct');
        break;
      }
    }
  
    if (selectedOption.innerText === decodeHTML(correctAnswer)) {
      correctCount++;
    } 
    // Remove incorrect class from previously selected options
    const incorrectOptions = questionContainer.getElementsByClassName('option incorrect');
    for (let i = 0; i < incorrectOptions.length; i++) {
      incorrectOptions[i].classList.remove('incorrect');
    }
  
    // Remove correct class from previously selected correct option
    const correctOption = questionContainer.getElementsByClassName('correct');
    if (correctOption.length > 0) {
      correctOption[0].classList.remove('correct');
    }
  
    // Remove correct class from previously selected incorrect option
    const selectedIncorrectOption = questionContainer.getElementsByClassName('selected incorrect');
    if (selectedIncorrectOption.length > 0) {
      selectedIncorrectOption[0].classList.remove('selected');
    }
  
    // Increment incorrect count only if the selected answer is incorrect
    if (selectedOption.innerText !== decodeHTML(correctAnswer)) {
      incorrectCount++;
    }
  }

// Display to check pass or fail
function checkPassFail() {
  const passPercentage = (correctCount / questions.length) * 100;

  let message = '';
  if (passPercentage >= 50) {
    message = 'Congratulations! You passed the test.<a href="index.html">Click To Retake the Quiz</a>';

    const surpriseButton = document.getElementById('surprise-button');
    surpriseButton.classList.remove('hidden');
  } else {
    message = 'Sorry, you failed the test.<a href="index.html">Click To Retake the Quiz</a>';
  }

  const passFailContainer = document.getElementById('pass-fail-container');
  passFailContainer.innerHTML = `<p>${message}</p>`;
}


const surpriseButton = document.getElementById('surprise-button');
surpriseButton.addEventListener('click', showSurprise);

function showSurprise() {
  const surpriseButton = document.getElementById('surprise-button');
  surpriseButton.classList.add('hidden');

  // Show alert message
  alert('Congratulations! You won a trophy!');


  // Create and append the trophy/badge element
  const trophyElement = document.createElement('img');
  trophyElement.src = './trop.png'; // Replace with your trophy/badge image or SVG file
  trophyElement.alt = 'Trophy'; // Add alternative text for accessibility
  trophyElement.classList.add('trophy');
  document.body.appendChild(trophyElement);

  const starElement = document.createElement('div');
  starElement.classList.add('shining-star');

  document.body.appendChild(starElement);

  setTimeout(function () {
    starElement.remove();
    surpriseButton.classList.remove('hidden');
  }, 5000);

  // Create smaller stars
  const numStars = 50; // Adjust the number of stars as desired
  for (let i = 0; i < numStars; i++) {
    createStar();
  }
}

function createStar() {
  const starElement = document.createElement('div');
  starElement.classList.add('star');
  starElement.style.top = `${getRandomPosition()}vh`;
  starElement.style.left = `${getRandomPosition()}vw`;
  document.body.appendChild(starElement);
}

function getRandomPosition() {
  return Math.random() * 100;
}

  
  

// Display the final results
function displayResults() {
    questionContainer.innerHTML = '';
  
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
  
    const correctResult = document.createElement('p');
    correctResult.innerHTML = `Correct answers: <span>${correctCount}</span>`;
    resultContainer.appendChild(correctResult);
  
    const incorrectResult = document.createElement('p');
    incorrectResult.innerHTML = `Incorrect answers: <span>${incorrectCount-5}</span>`;
    resultContainer.appendChild(incorrectResult);
  
    questionContainer.appendChild(resultContainer);

    checkPassFail();
  }
  

  
  // Add event listener to the submit button
submitButton.addEventListener('click', function() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      // Quiz finished, display the final results
      displayResults();
      submitButton.style.display = 'none';
      scoreElement.parentElement.style.display = 'none'; // Hide the score
    }
  });
  
  
  


  