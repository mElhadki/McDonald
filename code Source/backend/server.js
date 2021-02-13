const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('./app/configs/logger');
// @ts-ignore
global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));


// Configuring the database
const dbConfig = require('./app/configs/database.config.js');
const mongoose = require('mongoose');



const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())



mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.log("info","Successfully connected to the database");
}).catch(err => {
  logger.log("info",'Could not connect to the database. Exiting now...', err);
  process.exit();
});
const menuRouter = require("./app/routes/routes.menu");
app.use('/menu', menuRouter)

const sousmenuRouter = require('./app/routes/routes.sousmenu')
app.use('/sousmenu', sousmenuRouter);

const productRouter = require('./app/routes/routes.product');
app.use('/product', productRouter);

const suppRouter = require('./app/routes/routes.supp');
app.use('/supp', suppRouter);

const checkoutRouter = require('./app/routes/routes.checkout');
app.use('/checkout', checkoutRouter);

const couponRouter = require('./app/routes/routes.coupon');
app.use('/coupon', couponRouter);

const imageRouter = require('./app/routes/routes.getImage');
app.use('/image', imageRouter);

const tableRouter = require('./app/routes/routes.table');


app.use('/table', tableRouter);

app.listen(port, () => {
  logger.log("info",`Example app listening at http://localhost:${port}`)
})