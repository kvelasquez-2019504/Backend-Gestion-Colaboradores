import jwt from 'jsonwebtoken';

export const validateJWT = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.header("Authorization");
    
    if (!token) {
        return res.status(401).json('El token es necesario para la autenticación');
    }
    
    try {
        token = token.replace(/^Bearer\s+/, '')
        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.user = tokenDecoded;
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
    next();
}