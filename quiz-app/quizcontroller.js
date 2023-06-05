const quiz = require('./model')

exports.newQuiz=async(req,res)=>{
    await quiz.create(req.body)
    res.json({message:"quiz added successfull"})
}

exports.getquiz=async(req,res)=>{
    const quizes=await quiz.find()
    res.json(quizes)
}