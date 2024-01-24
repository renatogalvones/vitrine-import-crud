module.exports = (app) => {
  const OrderStatusController = require('../controllers/orderStatus.controllers');
  const orderStatusRoute = require('express').Router();

  orderStatusRoute.get('/:index', OrderStatusController.findOne);
  orderStatusRoute.get('/', OrderStatusController.findAll);
  orderStatusRoute.post('/', OrderStatusController.create);
  orderStatusRoute.put('/:index', OrderStatusController.update);
  orderStatusRoute.delete('/:index', OrderStatusController.delete);

  app.use('/api/orderstatus', orderStatusRoute);
}

