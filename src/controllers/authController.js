// Controller: request lega, service ko call karega, response bhejega. Business logic yahan nahi.
const authService = require("../services/authService");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error("name, email and password are required");
      err.status = 400;
      throw err;
    }

    const user = await authService.registerUser({ name, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("email and password are required");
      err.status = 400;
      throw err;
    }

    const result = await authService.loginUser({ email, password });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.getUserById(req.user.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me };
