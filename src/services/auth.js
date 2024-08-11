import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import createHttpError from 'http-errors';
import path from 'node:path';
import * as fs from 'node:fs/promises';
import { UsersCollection } from '../models/userSchema.js';
import { SessionsCollection } from '../models/sessionSchema.js';
import { sendMail } from '../utils/sendMail.js';
import {
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
  SMTP,
  TEMPLATE_DIR,
  // APP_DOMAIN,
} from '../constants/index.js';

async function registerUser(payload) {
  const duplicateEmail = await UsersCollection.findOne({
    email: payload.email,
  });
  if (duplicateEmail !== null) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return UsersCollection.create({ ...payload, password: encryptedPassword });
}

const createSession = () => {
  return {
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  };
};
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

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: checkedUser._id,
    ...newSession,
  });
}

async function logoutUser(sessionId) {
  await SessionsCollection.deleteOne({ _id: sessionId });
}

async function refreshUserSession(sessionId, refreshToken) {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw httpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
}

async function sendResetEmail(email) {
  const user = await UsersCollection.findOne({ email });

  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '5m' },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATE_DIR,
    'reset-password-email.html',
  );

  const templateSourse = await fs.readFile(resetPasswordTemplatePath, {
    encoding: 'utf-8',
  });

  const template = handlebars.compile(templateSourse);
  const link = `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`;
  console.log(link);

  const html = template({
    name: user.name,
    link,
  });
  console.log(html);

  await sendMail({
    from: SMTP.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html,
  });
}

async function resetPassword(email, token) {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw err;
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  sendResetEmail,
  resetPassword,
};
