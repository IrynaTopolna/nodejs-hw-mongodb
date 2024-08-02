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

async function loginController(req, res) {
  const session = await AuthService.loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

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

export { registerController, loginController, logoutController };
