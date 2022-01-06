require('dotenv').config();
const jwt = require('jsonwebtoken');
// check token / authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
    try {
        req.authenticatedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        return res.status(403).json({
            status: 403,
            message: 'Forbidden',
            error: error
        });
    }
}

module.exports = { isAuthenticated }