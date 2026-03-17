import { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers/userController.js';
import { validateUser } from '../middlewares/userValidator.js';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', validateUser, createUser);

export default router;
