import idioma from "../models/idioma.js";
import { Op } from "sequelize";

export const list_idiomas = async (req, res, next) => {
    try {
        const idiomas = await idioma.findAll()

        if (idiomas.length === 0) {
            return res.status(204).json({
                message: 'No existen idiomas registrados'
            })
        }

        return res.status(200).json({
            message: 'Idiomas registrados',
            data: idiomas
        })

    } catch (error) {

        console.log("Error al listar los idiomas: ", error.message)

        return res.status(500).json({
            message: 'Error al listar los idiomas',
            error: error.message
        })

    }
}

export const create_idioma = async (req, res, next) => {
    try {

        const { nombre } = req.body

        if (!nombre) {
            return res.status(400).json({
                message: 'Debes ingresar el nombre del idioma ha registrar'
            })
        }

        const exists_idioma = await idioma.findOne({
            where: {
                nombre: nombre
            }
        })

        if (exists_idioma) {
            return res.status(400).json({
                message: 'Ya existe un idioma con este nombre, por favor verifique'
            })
        }

        await idioma.create({
            nombre: nombre
        })

        return res.status(200).json({
            message: 'Idioma creado con exito!'
        })

    } catch (error) {

        console.log('Error al agregar un nuevo idioma: ', error.message)

        return res.status(500).json({
            message: 'Error al agregar un nuevo idioma',
            error: error.message
        })

    }
}

export const update_idioma = async (req, res, next) => {
    try {

        const { idioma_id, nombre } = req.body

        if (!nombre || !idioma_id) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios, por favor verifique'
            })
        }

        const Idioma = await idioma.findOne({
            where: {
                idioma_id: idioma_id
            }
        })

        if (!Idioma) {
            return res.status(404).json({
                message: 'Este idioma no esta registrado, por favor verifique'
            })
        }

        const exists_idioma = await idioma.findOne({
            where: {
                nombre: nombre,
                idioma_id: { [Op.ne]: idioma_id }
            }
        })

        if (exists_idioma) {
            return res.status(400).json({
                message: 'Ya existe un idioma registrado con este nombre'
            })
        }

        await Idioma.update({
            nombre: nombre
        })

        return res.status(200).json({
            message: 'Idioma actualizado con exito!'
        })

    } catch (error) {
        console.log('Error al actualizar el idioma: ', error.message)
        return res.status(500).json({
            message: 'Error al actualizar el idioma',
            error: error.message
        })
    }
}

export const delete_idioma = async (req, res, next) => {
    try {

        const { idioma_id } = req.body

        if (!idioma_id) {
            return res.status(400).json({
                message: 'El id del idioma es requerido, por favor verifique'
            })
        }

        const Idioma = await idioma.findOne({
            where: {
                idioma_id: idioma_id
            }
        })

        if (!Idioma) {
            return res.status(404).json({
                message: 'Este idioma no esta registrado, por favor verifique'
            })
        }

        await Idioma.destroy()

        return res.status(200).json({
            message: 'Idioma eliminado con exito!'
        })

    } catch (error) {
        console.log('Error al eliminar el idioma: ', error.message)
        return res.status(500).json({
            message: 'Error al eliminar el idioma',
            error: error.message
        })
    }
}