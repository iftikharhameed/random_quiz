
async function fetchQuiz() {
  fetch(`http://localhost:3000/api/getquiz`)
    .then(response => response.json())
    .then(quizData => {
      const questionElement = document.getElementById('question');
      const optionsElement = document.getElementById('options');

      if (quizData.length === 0) {
        questionElement.textContent = 'No quiz available';
        optionsElement.innerHTML = '';
        return;
      }

      var randomQuestion = quizData[Math.floor(Math.random() * quizData.length)];

      questionElement.textContent = randomQuestion.question;
      optionsElement.innerHTML = '';

      randomQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = index;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(option));
        optionsElement.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Failed to fetch quiz:', err);
      questionElement.textContent = 'Failed to fetch quiz';
      optionsElement.innerHTML = '';
    });
}

function submitAnswer() {
  const answer = document.querySelector('input[name="answer"]:checked');
  const resultElement = document.getElementById('result');

  if (answer) {
    const selectedAnswer = parseInt(answer.value);

    
    fetch(`http://localhost:3000/api/getquiz`)
      .then(response => response.json())
      .then(quizData => {
        const randomQuestion = quizData[Math.floor(Math.random() * quizData.length)];

        console.log(randomQuestion.correct);
        if (selectedAnswer == randomQuestion.correct) {
          resultElement.textContent = 'Correct!';
        } else {
          resultElement.textContent = 'Incorrect!';
        }
      })
      .catch(err => {
        console.error('Failed to fetch quiz:', err);
        resultElement.textContent = 'Failed to fetch quiz';
      });
  } else {
    resultElement.textContent = 'Please select an answer';
  }
}


fetchQuiz();

