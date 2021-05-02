const express = require('express');
const router = express.Router();
const User = require('../model/user');
var middleware = require('../middlewares/middleware');

router.get('/',  async (req, res) => {
  const users = await User.find();
  // console.log(users.map(us=> [us._id, us.nombre]));
  res.send(users);
});

router.get('/:id', async (req, res, next) => {
  let { id } = req.params;
  const user = await User.findById(id);
  console.log(user);
  res.send(user);
});

router.post('/', async(req, res, next) => {
  if(!req.body.nombre){
    res.status(400).send({'Datos invalidos':req.body});
  };
  const user = new User(req.body);
  await user.save((err,p)=>{
    if(err) res.status(400).send({'Error al registrar a':req.body.nombre});    
    console.log(p._doc);
    res.send(p);
  });
  
});



router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = req.body;
  console.log(user);
  await User.update({_id: id}, user);
  res.send('hecho');
});

router.delete('/:id', async (req, res, next) => {
  let { id } = req.params;
  console.log(id);
  await User.remove({_id: id});
  res.send('hecho');
});
router.get('/clear', async (req, res, next) => {
  console.log('Borrando too');
  await User.deleteMany();
  res.send('hecho');
});


module.exports = router;
