import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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

            const newAccessToken = jwt.sign({ usuario_id: usuario.usuario_id, nombre: usuario.nombre, apellido: usuario.apellido }, process.env.JWT_SECRET, {
                expiresIn: '30m',
            });

            return res.status(200).json({
                message: 'Token de acceso actualizado correctamente',
                token_nuevo: newAccessToken
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