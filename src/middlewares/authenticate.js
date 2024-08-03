import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/sessionSchema.js';
import { UsersCollection } from '../models/userSchema.js';

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader !== 'string') {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authHeader.split(' ', 2); //2 parts of the auth header

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  const session = await SessionsCollection.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });

  if (user === null) {
    return next(createHttpError(401));
  }

  req.user = user;

  next();
}
