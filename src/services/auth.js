import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../models/userSchema.js';
import { SessionsCollection } from '../models/sessionSchema.js';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../constants/index.js';

async function registerUser(payload) {
  const duplicateEmail = await UsersCollection.findOne({
    email: payload.email,
  });
  if (duplicateEmail !== null) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return UsersCollection.create({ ...payload, password: encryptedPassword });
}

async function loginUser(payload) {
  const checkedUser = await UsersCollection.findOne({ email: payload.email });
  if (checkedUser === null) throw createHttpError(404, 'User not found');

  const isEqualPassword = await bcrypt.compare(
    payload.password,
    checkedUser.password,
  );
  if (isEqualPassword === false) throw createHttpError(401, 'Unauthorized');
  // if (isEqualPassword === false) throw createHttpError(401, 'Wrong password');

  await SessionsCollection.deleteOne({ userId: checkedUser._id });

  return await SessionsCollection.create({
    userId: checkedUser._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
}

export { registerUser, loginUser };
