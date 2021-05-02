const express = require('express');
const router = express.Router();
const User = require('../model/user');
const middleware = require('./../middlewares/middleware');

const auth = middleware.ensureAuthenticated;

router.get('/', auth, async (req, res) => {
  const users = await User.find();
  res.send({status:'Connectado'});
});

router.post('/add', auth, async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  res.redirect('/');
});

router.get('/turn/:id', auth, async (req, res, next) => {
  let { id } = req.params;
  const user = await User.findById(id);
  user.status = !user.status;
  await user.save();
  res.redirect('/');
});


router.get('/edit/:id', auth, async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user)
  res.render('edit', { user });
});

router.post('/edit/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', auth, async (req, res, next) => {
  let { id } = req.params;
  await User.remove({_id: id});
  res.redirect('/');
});


module.exports = router;
