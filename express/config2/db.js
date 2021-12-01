const mongoose = require('mongoose');
var uri = `mongodb://localhost:27017/ecommerce`;
mongoose.connect(uri, {
    useNewUrlParser: true, 

useUnifiedTopology: true 
})
mongoose.Promise = global.Promise;
console.log("--mongoose")
module.exports = mongoose;
