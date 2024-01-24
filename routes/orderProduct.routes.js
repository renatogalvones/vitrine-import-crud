module.exports = (app) => {
  const OrderProductsController = require('../controllers/orderProducts.controllers');
  const orderProductsRoute = require('express').Router();

  orderProductsRoute.get('/:index', OrderProductsController.findOne);
  orderProductsRoute.get('/', OrderProductsController.findAll);
  orderProductsRoute.get('/order/:orderId', OrderProductsController.findByOrder);
  orderProductsRoute.post('/', OrderProductsController.create);
  orderProductsRoute.put('/:index', OrderProductsController.update);
  orderProductsRoute.delete('/:index', OrderProductsController.delete);

  app.use('/api/orderproducts', orderProductsRoute);
}