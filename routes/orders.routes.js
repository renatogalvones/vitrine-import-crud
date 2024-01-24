module.exports = (app) => {
  const OrderController = require('../controllers/orders.controllers');
  const ordersRoute = require('express').Router();

  ordersRoute.get('/:index', OrderController.findOne);
  ordersRoute.get('/', OrderController.findAll);
  ordersRoute.get('/user/:userId', OrderController.findByUser);
  ordersRoute.post('/', OrderController.create);
  ordersRoute.put('/:index', OrderController.update);
  ordersRoute.delete('/:index', OrderController.delete);

  app.use('/api/orders', ordersRoute);
}