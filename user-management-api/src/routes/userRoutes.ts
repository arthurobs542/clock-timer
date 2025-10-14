import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export const userRoutes = router;