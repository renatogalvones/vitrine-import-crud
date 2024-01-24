module.exports = (app) => {
  const UserController = require('../controllers/user.controllers');

  const userRoute = require('express').Router();
  userRoute.get('/:index', UserController.findOne);
  userRoute.get('/', UserController.findAll);
  userRoute.post('/', UserController.create);
  userRoute.put('/:index', UserController.update);
  userRoute.delete('/:index', UserController.delete);

  app.use('/api/users', userRoute);
}
