const { verify } = require("jsonwebtoken");

const secret_key = process.env.SECRET_KEY


export const validateToken = (req, res, next) => {

    if (!req.url.startsWith('/fields')) {
        return next()
    }

  try {
    
    const accessToken = req.headers.authorization.split(' ')[1]

    const validToken = verify(accessToken, secret_key);

    // console.log('validToken:', validToken)

    if (validToken) {
        req.authenticated = true;
        // Do something with validToken
        return next();
    } else {
        return res.status(400).json({ error: "token is invalid or expired!"});
    }

  } catch (err) {
    // console.log('err', err)
        return res.status(400).json({ error: 'Please provide a valid token' });
  }
};