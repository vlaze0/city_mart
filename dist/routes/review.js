"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/product/:productId').get(reviewController_1.getProductReviews);
router.route('/product/:productId/rating').get(reviewController_1.getProductRating);
router.route('/').post(auth_1.protect, reviewController_1.createReview);
router.route('/myreviews').get(auth_1.protect, reviewController_1.getUserReviews);
router.route('/:id').put(auth_1.protect, reviewController_1.updateReview).delete(auth_1.protect, reviewController_1.deleteReview);
exports.default = router;
//# sourceMappingURL=review.js.map