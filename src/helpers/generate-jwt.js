import jwt from 'jsonwebtoken';

export const generateJWT = (idColaborator = '') =>{
    return new Promise((resolve, reject) => {
        const payload = {idColaborator};
        jwt.sign(
            payload,
            process.env.SECRET_KEY_JWT,
            {
                expiresIn: '3h'
            },
            (err, token) =>{
                err ? (console.log(err), reject('El token no se pudo generar')) 
                    : resolve(token);
            }
        )
    })
}