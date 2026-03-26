import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { validateUser, validatePatchUser } from '../middlewares/userValidator.js';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', validateUser, createUser);
router.patch('/users/:id', validatePatchUser, updateUser);
router.delete('/users/:id', deleteUser);

export default router;
