const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrder,
  getOrders,
  getOrdersByMovies
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders);
router.get('/myorders', protect, getMyOrder);
router.get('/byMovies', protect, admin, getOrdersByMovies);
router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
