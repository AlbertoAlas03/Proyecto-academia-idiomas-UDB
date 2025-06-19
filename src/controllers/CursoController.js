import { Op } from "sequelize";
import curso from "../models/curso";
import idioma from "../models/idioma"

export const list_cursos = async (req, res, next) => {
    try {

        const Cursos = await curso.findAll({
            include: [{
                model: idioma,
                as: 'idioma'
            }]
        })

        if (Cursos.length === 0) {
            return res.status(204).json({
                message: 'No existen cursos registados'
            })
        }

        return res.status(200).json({
            message: 'Cursos registrados',
            data: Cursos
        })

    } catch (error) {

        console.log('Error al listar los cursos: ', error.message)

        return res.status(500).json({
            message: 'Error al listar los cursos',
            error: error.message
        })
    }
}

export const create_curso = async (req, res, next) => {
    try {

        const {
            idioma_id,
            nombre,
            descripcion,
            programa,
            modalidad,
            horario,
            fecha_inicio,
            fecha_fin,
            capacidad_maxima
        } = req.body

        if (!idioma_id || !nombre || !descripcion || !programa || !modalidad || !horario || !fecha_fin || !fecha_inicio || !capacidad_maxima) {
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
                message: 'El idioma del curso no esta registrado, por favor verifique'
            })
        }

        const exists_curso = await curso.findOne({
            where: {
                nombre: nombre
            }
        })

        if (exists_curso) {
            return res.status(400).json({
                message: 'Ya existe un curso con este nombre'
            })
        }

        await curso.create({
            idioma_id: idioma_id,
            nombre: nombre,
            descripcion: descripcion,
            programa: programa,
            modalidad: modalidad,
            horario: horario,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            capacidad_maxima: capacidad_maxima
        })

        return res.status(200).json({
            message: 'Curso creado con exito!'
        })

    } catch (error) {

        console.log('Error al crear el curso: ', error.message)

        return res.status(500).json({
            message: 'Error al crear el curso',
            error: error.message
        })
    }
}

export const update_curso = async (req, res, next) => {
    try {

        const {
            curso_id,
            idioma_id,
            nombre,
            descripcion,
            programa,
            modalidad,
            horario,
            fecha_inicio,
            fecha_fin,
            capacidad_maxima
        } = req.body

        if (!curso_id || !idioma_id || !nombre || !descripcion || !programa || !modalidad || !horario || !fecha_fin || !fecha_inicio || !capacidad_maxima) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios, por favor verifique'
            })
        }

        const Curso = await curso.findOne({
            where: {
                curso_id: curso_id
            }
        })

        if (!Curso) {
            return res.status(404).json({
                message: 'Este curso no esta registrado, por favor verifique'
            })
        }

        const Idioma = await idioma.findOne({
            where: {
                idioma_id: idioma_id
            }
        })

        if (!Idioma) {
            return res.status(404).json({
                message: 'El idioma del curso no esta registrado, por favor verifique'
            })
        }

        const exists_curso = await curso.findOne({
            where: {
                nombre: nombre,
                curso_id: { [Op.en]: curso_id }
            }
        })

        if (exists_curso) {
            return res.status(400).json({
                message: 'Ya existe un curso con este nombre'
            })
        }

        await Curso.update({
            idioma_id: idioma_id,
            nombre: nombre,
            descripcion: descripcion,
            programa: programa,
            modalidad: modalidad,
            horario: horario,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            capacidad_maxima: capacidad_maxima
        })

        return res.status(200).json({
            message: 'Curso actualizado con exito!'
        })

    } catch (error) {

        console.log('Error al actualizar el curso: ', error.message)

        return res.status(500).json({
            message: 'Error al actualizar el curso',
            error: error.message
        })
    }
}

export const delete_curso = async (req, res, next) => {
    try {

        const { curso_id } = req.body

        if (!curso_id) {
            return res.status(400).json({
                message: 'El id del curso es obligatorio, por favor verifique'
            })
        }

        const Curso = await curso.findOne({
            where: {
                curso_id: curso_id
            }
        })

        if (!Curso) {
            return res.status(404).json({
                message: 'Este curso no esta registrado, por favor verifique'
            })
        }

        await Curso.destroy()

        return res.status(200).json({
            message: 'Curso eliminado con exito!'
        })
    } catch (error) {

        console.log('Error al eliminar el curso: ', error.message)

        return res.status(500).json({
            message: 'Error al eliminar el curso',
            error: error.message
        })
    }
}