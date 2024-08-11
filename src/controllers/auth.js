import * as AuthService from '../services/auth.js';

async function registerController(req, res, next) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await AuthService.registerUser(user);

  res.send({
    status: 201,
    message: 'Successfully registered a user!',
    data: registeredUser,
  });
}

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

async function loginController(req, res) {
  const session = await AuthService.loginUser(req.body);

  setupSession(res, session);

  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

async function logoutController(req, res, next) {
  if (typeof req.cookies.sessionId === 'string') {
    await AuthService.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
}

async function refreshController(req, res, next) {
  const session = await AuthService.refreshUserSession(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );

  setupSession(res, session);

  res.send({
    status: 200,
    message: 'Successfully refreshed a session',
    data: {
      accessToken: session.accessToken,
    },
  });
}

async function sendResetEmailController(req, res, next) {
  await AuthService.sendResetEmail(req.body.email);

  res.send({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
}

async function resetPasswordController(req, res, next) {
  const { email, token } = req.body;

  await AuthService.resetPassword(email, token);

  res.send({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
}

export {
  registerController,
  loginController,
  logoutController,
  refreshController,
  sendResetEmailController,
  resetPasswordController,
};
