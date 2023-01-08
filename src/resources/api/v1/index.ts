import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import walletRoutes from './wallet/wallet.routes';
import transactionRoutes from './transaction/transaction.routes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/wallets', walletRoutes);
router.use('/transactions', transactionRoutes);
export default router;
