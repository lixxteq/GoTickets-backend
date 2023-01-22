import response from "../settings/response";
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1] || null;
    if (!token) return response.send(401, 'ERR_AUTHORIZATION_TOKEN_REQUIRED', res);
    
    jwt.verify(token, process.env.JWT_KEY, (error, data) => {
        if (error) return response.send(402, 'ERR_AUTHORIZATION_TOKEN_NOT_VALID', res);
        req.issuer = data;
        next();
    });
};