const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');
async function connectDatabase(){
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDatabase();


(async () => {

  await db.sequelize.sync({ alter: true });
  // Code here


})();

require('./routes/user.routes')(app);
require('./routes/orderStatus.routes')(app);
require('./routes/products.routes')(app);
require('./routes/orders.routes')(app);
require('./routes/orderProduct.routes')(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3333);