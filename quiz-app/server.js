const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {newQuiz, getquiz}= require('./quizcontroller')
const  cors=require('cors')


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// const Quiz = mongoose.model('Quiz', quizSchema);

// API endpoints
// app.post('/quiz', (req, res) => {
//   const { question, options, correctAnswer } = req.body;

//   const newQuiz = new Quiz({
//     question,
//     options,
//     correctAnswer
//   });

//   newQuiz.save()
//     .then(() => res.send('Quiz saved successfully'))
//     .catch(err => res.status(500).send('Failed to save quiz'));
// });

// app.get('/quiz', (req, res) => {
//   Quiz.find({})
//     .then(quizData => res.json(quizData))
//     .catch(err => res.status(500).send('Failed to fetch quiz'));
// });







router.route('/quiz').post(newQuiz)
router.route('/getquiz').get(getquiz)


module.exports=router




const mongoURL='mongodb://127.0.0.1:27017/quizdb'

const connectToMong=()=>{
    
        mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{
            console.log("conncted to db");
        }).catch(()=>{
            console.log("error accured");
        })
 
}


connectToMong()
app.use(express.json())
const port=3000
app.use(cors())
app.use('/api',router)


;


app.listen(port,()=>{
    console.log(`app is runnig ${port}`)
})



