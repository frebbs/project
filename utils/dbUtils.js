const User = require('../models/users')
const Question = require('../models/gameQuestion');
const bcrypt = require('bcrypt');
const SALTROUNDS = 10;


// Find a user by ID
async function findUserByID(id) {
    return User.findOne({_id: id})
}


//  Create a user
async function createUser(req, res, next) {

    let { email, password } = req.body;
    await bcrypt.hash(password, SALTROUNDS, function(err, hash) {
        if(err) return console.log(err)

        const user = new User({
            email: email === '' ? null : email,
            password: hash === '' ? null : hash
        });
    
        console.log(user)
    
        user.save().catch(e => console.log(e))
        return res.redirect('/')
        
    })
}


// TODO: Add flash notice for errors
async function loginUser(req, res, next) {

    const { email, password } = req.body

    const user = await User.findOne({email})

    if(!user) {
        console.log(`Error, user not found`);
        return res.redirect('/login');

    } else if(user) {
        await bcrypt.compare(password, user.password, function(err, result) {
            if(err) return console.log(err)
            if(result) {
                req.session.user = {
                    id: user._id,
                    email: user.email,
                    authenticated: true
                }
                return res.redirect('/members');
            } else {
                return res.redirect('/login');
            }
        })

    }
}

// Create a new question
async function saveQuestion(req, res, next) {
    const { question, category, choiceA, choiceB, choiceC, choiceD, answer } = req.body;
    const loggInUser = req.session.user.id

    const userQuestion = new Question({
        question,
        category,
        choices: [choiceA, choiceB, choiceC, choiceD],
        answer,
        createdBy: loggInUser
    })

    await userQuestion.save().catch(e => console.log(e))

    return res.redirect('/members/profile')
}

// Find all questions for the currently logged in user
async function getUserQuestions(id) {
    return Question.find({ createdBy: id });

}

async function getRandomQuestions(num = 2) {
    return Question.aggregate([{$sample: {size: num}}])
}

module.exports = {
    createUser,
    loginUser,
    saveQuestion,
    getUserQuestions,
    getRandomQuestions
}