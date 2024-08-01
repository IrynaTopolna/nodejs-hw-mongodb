import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../models/userSchema.js';

async function registerUser(payload) {
  const duplicateEmail = await UsersCollection.findOne({
    email: payload.email,
  });
  if (duplicateEmail !== null) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return UsersCollection.create({ ...payload, password: encryptedPassword });
}

export { registerUser };
