const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/homepage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(e => console.log(e))

module.exports = mongoose;