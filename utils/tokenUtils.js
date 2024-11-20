import jwt from 'jsonwebtoken';

export const JsonToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_IN,
    })
    return token;
}

 export const verifyJWT = (token) => {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken;
 }