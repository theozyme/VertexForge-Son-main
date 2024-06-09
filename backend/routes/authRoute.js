import { Router } from 'express';
import { login, register, registerkurumsal, verifyToken } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/registerkurumsal', registerkurumsal);

router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Bu rotaya erişiminiz var', user: req.user });
});

export default router;
