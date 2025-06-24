import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

const generateTokens = (usuario) => {
    const accessToken = jwt.sign({ usuario_id: usuario.usuario_id, nombre: usuario.nombre, apellido: usuario.apellido }, process.env.JWT_SECRET, {
        expiresIn: '30m',
    });

    const refreshToken = jwt.sign({ usuario_id: usuario.usuario_id, nombre: usuario.nombre, apellido: usuario.apellido }, process.env.REFRESH_SECRET, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};

export default generateTokens