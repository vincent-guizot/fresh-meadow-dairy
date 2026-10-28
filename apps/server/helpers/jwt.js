const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'bebas';

const tokenGenerator = (user) => {
    const { id, username, email } = user;
    return jwt.sign({
        id,
        username,
        email
    }, secretKey, { expiresIn: '7d' });
};

const tokenVerifier = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    tokenGenerator,
    tokenVerifier
};
