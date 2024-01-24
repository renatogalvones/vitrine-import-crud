const db = require('../models');
const { OrderStatus } = db;

exports.findOne = async(req, res) => {
  const { index } = req.params;
  const orderStatus = await OrderStatus.findByPk(index);

  if (!orderStatus) return res.status(200).send({
    type: 'not_found',
    message: 'OrderStatus not found',
  });

  return res.json(orderStatus.get());
}

exports.findAll = async(req, res) => {
  const orderStatuses = await OrderStatus.findAll();

  return res.json(orderStatuses);
}

exports.create = async(req, res) => {
  const { name } = req.body;

  const newOrderStatus = OrderStatus.build({ name });

  try {
    const dbRes = await newOrderStatus.save();
    return res.send(dbRes);
  } catch (error) {
    console.error(error);
    return res.status(200).send(error.errors.map(error => ({
      type: error.type,
      message: error.message,
    })));
  }
}

exports.update = async(req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  const orderStatus = await OrderStatus.findByPk(index);
  if (!orderStatus) res.status(200).send({
    type: 'orderStatus_not_found',
    message: 'orderStatus not found',
  });

  try {
    await OrderStatus.update({
      name: name,
    }, { where: { id: orderStatus.id }})

    const editedOrderStatus = await OrderStatus.findByPk(index);
    return res.json(editedOrderStatus.get());
  } catch (error) {
    console.error(error);
    return res.status(200).send(error.errors.map(error => ({
      type: error.type,
      message: error.message,
    })));
  }
}

exports.delete = async(req, res) => {
  const { index } = req.params;
  const orderStatus = await OrderStatus.findByPk(index);

  if (!orderStatus) return res.status(200).send({
    type: 'orderStatus_not_found',
    message: 'orderStatus not found',
  });

  const orderStatusDelete = await OrderStatus.destroy({ where: { id: orderStatus.id }});

  return res.json({ message: 'orderStatus deleted'});
}

