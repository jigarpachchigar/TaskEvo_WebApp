const mongoose = require('mongoose');
var uri = `mongodb://localhost:27017/ecommerce`;
mongoose.connect(uri, {useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
mongoose.Promise = global.Promise;
console.log("--mongoose")
module.exports = mongoose;
