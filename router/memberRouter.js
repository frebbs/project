const express = require('express');
const router = express.Router();
const { saveQuestion, getUserQuestions } = require('../utils/dbUtils');


router.use(function(req, res, next) {
    if(!req.session.user || req.session.user.authenticated === undefined || !req.session.user.authenticated ) {
        res.redirect('/')
    } else {
        next()
    }
})

router.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next()
})


router.get('/', (req, res) => {
    console.log(req.session)
    res.render('members/home');
});

router.get('/profile', async(req, res) => {
    const userQuestions = await getUserQuestions(req.session.user.id)
    res.render('members/profile', {userQuestions})
})

router.post('/addquestion', saveQuestion)

module.exports =  router;