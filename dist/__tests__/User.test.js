"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
describe('User Model', () => {
    it('should create a new user', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
            role: 'user'
        };
        const user = new User_1.default(userData);
        expect(user.email).toBe(userData.email);
        expect(user.name).toBe(userData.name);
        expect(user.role).toBe(userData.role);
    });
});
//# sourceMappingURL=User.test.js.map