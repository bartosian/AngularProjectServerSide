const JWT = require('jsonwebtoken');


function authToken(req, res, next) {
    const token = req.header("x-auth-token");

    if(!token) {
        return req.status(401)
            .json({
                "message": "Access denied. No token provided!"
            });
    }

    try {
        const decObject = JWT.verify(token, process.env.JWTKEY);

        req.user = decObject;
        next();
    } catch(ex) {
        return res.status(401)
            .json({
                "message": "You don't have permission on this operation!"
            });

    }

}

module.exports = authToken;