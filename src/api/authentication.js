const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

const authenticateRequest = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-kdbpfcpz.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "applications-api",
  issuer: "https://dev-kdbpfcpz.auth0.com/",
  algorithms: ["RS256"]
});

// TODO: change to real auth!
const mockAuthenticate = (req, res, next) => {
  try {
    header = req.headers.authorization;
    if (!header) {
      console.log("no token");
      return next(new UnauthorizedError("Missing Token"));
    }

    const [, token] = req.headers.authorization;

    req.user = {
      id: 1
    };

    return next();
  } catch (error) {
    next(new UnauthorizedError("Missing Token"));
  }
};

module.exports = {
  mockAuthenticate,
  authenticateRequest,
  UnauthorizedError
};
