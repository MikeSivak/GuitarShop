const {Router} = require('express');
const order_controller = require('../controllers/order.controller');
const order_router = Router();

order_router.get('/', order_controller.getOrdersList);
order_router.post('/sale', order_controller.saleGuitar);

module.exports = order_router;