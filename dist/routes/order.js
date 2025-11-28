"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/create', auth_1.protect, orderController_1.createOrder);
router.post('/create-payment-intent', auth_1.protect, orderController_1.createPaymentIntent);
router.post('/confirm-payment', auth_1.protect, orderController_1.confirmPayment);
router.get('/my-orders', auth_1.protect, orderController_1.getUserOrders);
router.get('/:id', auth_1.protect, orderController_1.getOrderById);
exports.default = router;
//# sourceMappingURL=order.js.map