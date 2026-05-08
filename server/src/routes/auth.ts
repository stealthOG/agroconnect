import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  register,
  sendOtp,
  verifyOtp,
  login,
  refreshTokens,
  logout,
  requestPasswordReset,
  confirmPasswordReset,
} from '../controllers/auth.controller';

const router = Router();

const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Too many auth attempts — try again in 15 minutes' },
  skipSuccessfulRequests: false,
});

const otpLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many OTP requests — try again in 15 minutes' },
});

router.post('/register',              authLimit, asyncHandler(register));
router.post('/login',                 authLimit, asyncHandler(login));
router.post('/logout',                           asyncHandler(logout));
router.post('/refresh',                          asyncHandler(refreshTokens));
router.post('/otp/send',              otpLimit,  asyncHandler(sendOtp));
router.post('/otp/verify',            otpLimit,  asyncHandler(verifyOtp));
router.post('/password-reset/request',authLimit, asyncHandler(requestPasswordReset));
router.post('/password-reset/confirm',authLimit, asyncHandler(confirmPasswordReset));

export default router;
