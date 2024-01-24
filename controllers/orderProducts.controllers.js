const db = require('../models');
const { OrderProducts, Products, Order } = db;

exports.findAll = async(req, res) => {
  const orderProducts = await OrderProducts.findAll();
  return res.json(orderProducts);
}

exports.findOne = async(req, res) => {
  const { index } = req.params;
  const orderProduct = await OrderProducts.findByPk(index);

  if(!orderProduct) return res.status(200).send({
    type: 'not_found',
    message: 'OrderProduct not found',
  });

  return res.json(orderProduct.get());
}

exports.findByOrder = async(req, res) => {
  const { orderId } = req.params;

  try {
    const orderProducts = await OrderProducts.findAll({ where: { order_id: orderId }});
    return res.json(orderProducts);
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}

exports.create = async(req, res) => {
  const { product_id, order_id, quantity } = req.body;
  const product = await Products.findByPk(product_id);

  if(!product) return res.status(200).json({
    type: 'not_found',
    message: 'Product not found',
  });

  const order = await Order.findByPk(order_id);
  if(!order) return res.status(200).json({
    type: 'not_found',
    message: 'Order not found',
  });

  const isProductOnOrderProduct = await OrderProducts.findAll({ where: { product_id, order_id }})
  console.log('isProductOnOrderProduct', isProductOnOrderProduct);
  if(isProductOnOrderProduct.length > 0) return res.status(200).json({
    type: 'duplicate',
    message: 'Product already exists to the related order',
  });

  const newOrderProduct = OrderProducts.build({ product_id, order_id, quantity });

  try {
    const dbRes = await newOrderProduct.save();
    return res.json(dbRes);
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}

exports.update = async(req, res) => {
  const { index } = req.params;
  const { product_id, order_id, quantity } = req.body;

  const orderProduct = await OrderProducts.findByPk(index);

  if(!orderProduct) return res.json({
    type: 'not_found',
    message: 'OrderProduct not found',
  });

  try {
    await orderProduct.update({
      product_id, order_id, quantity
    }, { where: { id: orderProduct.id }});

    const edited = await OrderProducts.findByPk(index);
    return res.json(edited.get());
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}

exports.delete = async(req, res) => {
  const { index } = req.params;
  const orderProduct = await OrderProducts.findByPk(index);
  console.log('orderProduct', orderProduct);
  if(!orderProduct) return res.status(200).json({
    type: 'not_found',
    message: 'OrderProduct not found',
  });

  try {
    const deleted = await OrderProducts.destroy({ where: { id: orderProduct.id }});
    return res.json({
      type: 'deleted',
      message: 'OrderProduct deleted',
    });
  } catch (error) {
    return console.log(error);
  }

}
