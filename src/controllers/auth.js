import * as UserService from '../services/users.js';

async function register(req, res, next) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registerUser = await UserService.registerUser(user);

  res.send({
    status: 201,
    message: 'Successfully registered a user!',
    data: registerUser,
  });
}

export { register };
