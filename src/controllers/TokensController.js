import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import generateToken from '../utils/generateTokens'

dotenv.config()

const refreshToken = async (req, res, next) => {
    try {

        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                message: 'No se ha proporcionado un token de refresco'
            })
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, usuario) => {

            if (error) {
                return res.status(403).json({
                    message: 'Token de refresco invalido o expirado'
                })
            }

            const newAccessToken = generateToken(usuario);

            return res.status(200).json({
                message: 'Token de acceso actualizado correctamente',
                token_nuevo: newAccessToken.accessToken
            });
        });

    } catch (error) {

        console.log('Error al refrescar el token: ', error.message)

        return res.status(500).json({
            message: 'Error al refrescar el token',
            error: error.message
        })
    }
}

export default refreshToken