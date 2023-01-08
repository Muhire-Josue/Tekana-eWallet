import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import walletRoutes from './wallet/wallet.routes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);
export default router;
