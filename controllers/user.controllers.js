const db = require('../models');
const { User } = db;

exports.findOne = async (req, res) => {
  const { index } = req.params;
  const user = await User.findByPk(index);

  if (!user) return res.status(200).send({
    type: 'not_found',
    message: 'User not found',
  });

  return res.json(user.get());
}

exports.findAll = async (req, res) => {
  const users = await User.findAll();

  return res.json(users);
}

exports.create = async (req, res) => {
  const { name, email } = req.body;

  const newUser = User.build({ name, email });
  try {
    const dbRes = await newUser.save();
    return res.send(dbRes);
  } catch (error) {
    console.log(error);
    return res.json(error.errors || error);
  }
}

exports.update = async (req, res) => {
  const { index } = req.params;
  const { name, email } = req.body;

  const user = await User.findByPk(index);
  if (!user) res.status(200).send({
    type: 'user_not_found',
    message: 'user not found',
  });

  await User.update({
    name: name || user.name,
    email: email || user.email,
  },{ where: { id: user.id }})

  const editedUser = await User.findByPk(index);

  return res.json(editedUser.get());
}

exports.delete = async (req, res) => {
  const { index } = req.params;

  const user = await User.findByPk(index);

  if (!user) res.status(200).send({
    type: 'user_not_found',
    message: 'user not found',
  });

  const userDelete = await User.destroy({ where: { id: index }});

  return res.json({ message: 'user deleted' });
}