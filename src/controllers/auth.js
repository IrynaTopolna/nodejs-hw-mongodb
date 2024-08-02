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
  const { email, password } = req.body;

  const session = await AuthService.loginUser(req.body);
  console.log({ session });

  res.send('login completed successfully');
}

export { registerController, loginController };
