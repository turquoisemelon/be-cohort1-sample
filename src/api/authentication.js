class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

// TODO: change to real auth!
const authenticateRequest = (req, res, next) => {
  try {
    token = req.headers.authorization;
    if (!token) {
      console.log("no token");
      return next(new UnauthorizedError("Missing Token"));
    }

    req.user = {
      id: 1
    };

    return next();
  } catch (error) {
    next(new UnauthorizedError("Missing Token"));
  }
};

module.exports = {
  authenticateRequest,
  UnauthorizedError
};
