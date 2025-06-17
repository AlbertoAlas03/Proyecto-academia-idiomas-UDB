import usuario from "../models/usuario";
import { Op } from "sequelize";

export const list_usuario = async (req, res, next) => {
    try {

        const usuarios = await usuario.findAll()

        if (usuarios.length === 0) {
            return res.status(204).json({
                message: 'No existen usuarios registrados'
            })
        }

        return res.status(200).json({
            message: 'Usuarios registrados',
            data: usuarios
        })

    } catch (error) {

        console.log('Error al listar los usuarios: ', error.message)

        return res.status(500).json({
            message: 'Error al listar los usuairos',
            error: error.message
        })
    }
}

export const create_usuario = async (req, res, next) => {
    try {

        const { nombre, apellido, email, password, telefono, rol } = req.body

        if (!nombre || !apellido || !email || !password || !telefono || !rol) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios, por favor verifique'
            })
        }

        const exists_email_usuario = await usuario.findOne({
            where: {
                email: email
            }
        })

        if (exists_email_usuario) {
            return res.status(400).json({
                message: 'Este correo eléctronico ya esta registrado!'
            })
        }

        await usuario.create({
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
            telefono: telefono,
            rol: rol
        })

        return res.status(200).json({
            message: 'Usuario registrado con exito!'
        })

    } catch (error) {

        console.log('Error al registrarse: ', error.message)

        return res.status(500).json({
            message: 'Error al registrarse',
            error: error.message
        })
    }
}

export const update_usuario = async (req, res, next) => {
    try {

        const { usuario_id, nombre, apellido, email, password, telefono, rol } = req.body

        if (!usuario_id || !nombre || !apellido || !email || !password || !telefono || !rol) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios, por favor verifique'
            })
        }

        const Usuario = await usuario.findOne({
            where: {
                usuario_id: usuario_id
            }
        })

        const exists_email_usuario = await usuario.findOne({
            where: {
                email: email,
                usuario_id: { [Op.ne]: usuario_id }
            }
        })

        if (!Usuario) {
            return res.status(404).json({
                message: 'Este usuario no esta registrado, por favor verifique'
            })
        } else if (exists_email_usuario) {
            return res.status(400).json({
                message: 'Este correo eléctronico ya esta registrado!'
            })
        }

        await Usuario.update({
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
            telefono: telefono,
            rol: rol
        })

        return res.status(200).json({
            message: 'Usuario actualizado con exito!'
        })

    } catch (error) {

        console.log('Error al actualizar el usuario: ', error.message)

        return res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: error.message
        })
    }
}

export const delete_usuario = async (req, res, next) => {
    try {

        const { usuario_id } = req.body

        if (!usuario_id) {
            return res.status(400).json({
                message: 'El id del usuario es obligatorio, por favor verifique'
            })
        }

        const Usuario = await usuario.findOne({
            where: {
                usuario_id: usuario_id
            }
        })

        if (!Usuario) {
            return res.status(404).json({
                message: 'Este usuario no esta registrado, por favor verifique'
            })
        }

        await Usuario.destroy()

        return res.status(200).json({
            message: 'Usuario eliminado con exito!'
        })

    } catch (error) {

        console.log('Error al eliminar el usuario: ', error.message)

        return res.status(500).json({
            message: 'Error al eliminar el usuario',
            error: error.message
        })
    }
}