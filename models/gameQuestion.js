const mongoose = require('../utils/dbConnection');

const questionSchema = new mongoose.Schema({
    question: String,
    category: String,
    choices: Array,
    answer:  String,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: {type: Date, default: Date.now}
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;