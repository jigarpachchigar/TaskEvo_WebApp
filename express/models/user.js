const mongoose = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters')
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
}, {timestamps:true});

userSchema.plugin(mongooseLeanGetters)
userSchema.plugin(uniqueValidator)

userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, saltRounds);
});

function dateToString(date){
  if(date) return new Date(date).toISOString();
}

module.exports = mongoose.model('User', userSchema);
