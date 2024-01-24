const db = require('../models');
const { Order, User, OrderStatus } = db;

exports.findAll = async(req, res) => {
  const orders = await Order.findAll();
  return res.json(orders);
}

exports.findOne = async(req, res) => {
  const { index } = req.params;
  const order = await Order.findByPk(index);

  if(!order) return res.json({
    type: 'not_found',
    message: 'Order not found',
  });

  return res.json(order.get());
}

exports.findByUser = async(req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.findAll({ where: { userId }});
    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}

exports.create = async(req, res) => {
  const { paid, userId, statusId } = req.body;

  const user = await User.findByPk(userId);
  if(!user) return res.status(200).json({
    type: 'not_found',
    message: 'User not found',
  });

  const orderStatus = await OrderStatus.findByPk(statusId);
  if(!orderStatus) return res.status(200).json({
    type: 'not_found',
    message: 'OrderStatus not found',
  });

  const newOrder = Order.build({
    paid: Number(paid),
    userId: user.id,
    statusId: orderStatus.id,
  });

  try {
    const dbRes = await newOrder.save();
    return res.json(dbRes);
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}

exports.update = async(req, res) => {
  const { index } = req.params;
  const { paid, userId, statusId } = req.body;

  const order = await Order.findByPk(index);
  if(!order) return res.json({
    type: 'not_found',
    message: 'Order not found',
  });

  try {
    await order.update({
      paid,
      userId,
      statusId,
    }, { where: {id: order.id }});

    const edited = await Order.findByPk(index);
    return res.json(edited.get());
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}

exports.delete = async(req, res) => {
  const { index } = req.params;

  const order = await Order.findByPk(index);
  if(!order) return res.json({
    type: 'not_found',
    message: 'Order not found',
  });

  try {
    const deleted = await Order.destroy({ where: { id: order.id }});
    return res.json({
      type: 'deleted',
      message: 'Order deleted',
    });
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}
