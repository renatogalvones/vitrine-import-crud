const db = require('../models');
const { Products } = db;

exports.findOne = async(req, res) => {
  const { index } = req.params;
  const product = await Products.findByPk(index);

  if(!product) res.status(200).send({
    type: 'not_found',
    message: 'Product not found',
  });

  return res.json(product.get());
}

exports.findAll = async(req, res) => {
  const products = await Products.findAll();
  return res.json(products);
}

exports.create = async(req, res) => {
  const { sku, sku_variation, name } = req.body;
  const newProduct = Products.build({
    sku: Number(sku),
    sku_variation: Number(sku_variation),
    name
  });

  try {
    const dbRes = await newProduct.save();
    return res.json(dbRes);
  } catch (error) {
    console.error(error);
  }
}

exports.update = async(req, res) => {
  const { index } = req.params;
  const { sku, sku_variation, name } = req.body;

  const product = await Products.findByPk(index);

  if(!product) return res.status(200).send({
    type: 'not_found',
    message: 'Product not found',
  });

  try {
    await Products.update({
      sku, sku_variation, name
    }, { where: { id: product.id }});

    const editedProduct = await Products.findByPk(index);

    return res.json(editedProduct.get());
  } catch (error) {
    console.log(error);
  }
}

exports.delete = async(req, res) => {
  const { index } = req.params;
  const product = await Products.findByPk(index);

  if(!product) res.status(200).send({
    type: 'not_found',
    message: 'Product not found',
  });

  try {
    const productDeleted = await Products.destroy({ where: { id: product.id }});
    return res.json({ message: 'product deleted' });
  } catch (error) {
    console.log(error);
  }
}