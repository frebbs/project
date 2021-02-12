const express = require('express');
const router = express.Router();
const { createUser, loginUser, getRandomQuestions } = require('../utils/dbUtils')

router.get('/', (req, res) => {
    res.render('root/index');
});

router.get('/login', (req, res) => {
    res.render('root/login');
});

router.post('/login', loginUser);

router.get('/signup', (req, res) => {
    res.render('root/signup');
});

router.post('/signup', createUser);

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/game', (req, res) => {
    res.render('root/game')
})

router.get('/getquestion', async (req, res) => {

    let questions = await getRandomQuestions()
    res.json({
        data: questions
    })
})
module.exports =  router;