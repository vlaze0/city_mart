import express from 'express';
import { protect, requireAdmin } from '../middleware/auth';
import { getAllUsers, deleteUser } from '../controllers/adminController';

const router = express.Router();

// All routes require authentication and admin privileges
router.use(protect);
router.use(requireAdmin);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

export default router;