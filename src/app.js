const env = require('./config/db-connection')
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// connection to db
console.log(env.bd_address + env.bd_name,env.bd_address,env.bd_name)
mongoose.connect(env.bd_address + env.bd_name)
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { bd_name } = require('./config/db-connection');


// settings
app.set('port', process.env.PORT || 3000);
// let isLogin = () => true;
// let loger = (req, res, next) =>{
//   console.log('Peticion del tipo: ', req.method);
//   next();
// }
// let showIp = (req, res, next) =>{
//   console.log('Ip: 127.0.0.1', process.env.TOKEN_SECRET);
//   next();
// }

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use((req, res, next)=>{
  // if(isLogin()){
    // next();
  // }else{
  //   res.send({status:'Unauthorized'});
  // }
// },loger, showIp);
// routes
app.use('/api/auth',authRoutes);
app.use('/api/', indexRoutes);
app.use('/api/user', userRoutes);

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
