const questionInput = document.getElementById('question-input');
const optionsInput = document.getElementById('options-input');
const correctAnswerInput = document.getElementById('correct-answer-input');
const newquiz=document.getElementById('NewQuizAdded')


const addQuiz=async(e)=>{
    e.preventDefault()

    fetch("http://localhost:3000/api/quiz",{

   // Adding method type
    method: "POST",


    // adding content to send

    body: JSON.stringify({
        question:questionInput.value,
        options:optionsInput.value.split(',').map(option => option.trim()),
        correct:parseInt(correctAnswerInput.value),
    }),


    headers:{
        "Content-type": "application/json; charset=UTF-8"
    }



})

questionInput.value="",
optionsInput.value="",
correctAnswerInput.value="",

alert("Quiz Added");
}


newquiz.addEventListener('submit',addQuiz)