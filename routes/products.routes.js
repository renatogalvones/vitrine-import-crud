module.exports = (app) => {
  const ProductsController = require('../controllers/products.controllers');
  const productsRoute = require('express').Router();

  productsRoute.get('/:index', ProductsController.findOne);
  productsRoute.get('/', ProductsController.findAll);
  productsRoute.post('/', ProductsController.create);
  productsRoute.put('/:index', ProductsController.update);
  productsRoute.delete('/:index', ProductsController.delete);

  app.use('/api/products', productsRoute);
}