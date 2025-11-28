"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const order_1 = __importDefault(require("./routes/order"));
const review_1 = __importDefault(require("./routes/review"));
const admin_1 = __importDefault(require("./routes/admin"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, database_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/orders', order_1.default);
app.use('/api/reviews', review_1.default);
app.use('/api/admin', admin_1.default);
const error_1 = __importDefault(require("./middleware/error"));
app.use(error_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'City Mart API is running!' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map