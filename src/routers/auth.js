import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { register } from '../controllers/auth.js';
import { registerSchema } from '../validation/authValidation.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register),
);

export default router;
