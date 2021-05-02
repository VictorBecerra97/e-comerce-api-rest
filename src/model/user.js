const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  nombre: String,
  correo:String,
  password:String,
});

module.exports = mongoose.model('users', UserSchema);
