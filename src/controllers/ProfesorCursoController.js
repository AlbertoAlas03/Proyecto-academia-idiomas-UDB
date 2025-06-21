import profesor_curso from "../models/profesor_curso.js"
import usuario from "../models/usuario.js"
import curso from "../models/curso.js"
import { Op } from "sequelize"
import idioma from "../models/idioma.js"

export const list_profesores_cursos = async (req, res, next) => {
    try {

        const profesores = await profesor_curso.findAll({
            include: [{
                model: curso,
                as: 'curso',
                include: [{
                    model: idioma,
                    as: 'idioma'
                }],
                attributes: ['curso_id', 'idioma_id', 'nombre', 'descripcion', 'programa', 'modalidad', 'horario', 'activo']
            }, {
                model: usuario,
                as: 'profesor',
                attributes: ['usuario_id', 'nombre', 'apellido', 'email']
            }]
        })

        if (profesores.length === 0) {
            return res.status(404).json({
                message: 'No existen profesores asignados a cursos'
            })
        }

        return res.status(200).json({
            message: 'Profesores asignados a cursos',
            data: profesores
        })

    } catch (error) {

        console.log('Error al listar los profesores asignados a cursos: ', error.message)

        return res.status(500).json({
            message: 'Error al listar los profesores asignados a cursos',
            error: error.message
        })
    }
}

export const asignar_profesor_curso = async (req, res, next) => {
    try {

        const { profesor_id, curso_id, aula } = req.body

        if (!profesor_id || !curso_id || !aula) {
            return res.status(400).json({
                message: 'El id del profesor y del curso es obligatorio, por favor verifique'
            })
        }

        const profesor = await usuario.findOne({
            where: {
                usuario_id: profesor_id
            }
        })

        if (!profesor) {
            return res.status(404).json({
                message: 'Este profesor no esta registrado, por favor verifique'
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

        const exists_profesor_asignado = await profesor_curso.findOne({
            where: {
                profesor_id: profesor_id,
                curso_id: curso_id
            }
        })

        if (exists_profesor_asignado) {
            return res.status(400).json({
                message: 'Este profesor ya esta asignado a este curso, por favor verifique'
            })
        }

        await profesor_curso.create({
            profesor_id: profesor_id,
            curso_id: curso_id
        })

        return res.status(200).json({
            message: 'Profesor asignado al curso con exito!'
        })
    } catch (error) {

        console.log('Error al asignar el curso al profesor: ', error.message)

        return res.status(500).json({
            message: 'Error al asignar el curso al profesor',
            error: error.message
        })
    }
}

export const update_profesor_curso = async (req, res, next) => {
    try {

        const { asignacion_id, profesor_id, curso_id } = req.body


        if (!asignacion_id || !profesor_id || !curso_id) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios, por favor verifique'
            })
        }

        const asignacion = await profesor_curso.findOne({
            where: {
                asignacion_id: asignacion_id
            }
        })

        if (!asignacion) {
            return res.status(404).json({
                message: 'Esta asignacion no esta registrada, por favor verifique'
            })
        }

        const profesor = await usuario.findOne({
            where: {
                usuario_id: profesor_id
            }
        })

        if (!profesor) {
            return res.status(404).json({
                message: 'Este profesor no esta registrado, por favor verifique'
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

        const exists_profesor_curso = await profesor_curso.findOne({
            where: {
                curso_id: curso_id,
                profesor_id: profesor_id,
                asignacion_id: { [Op.ne]: asignacion_id }
            }
        })

        if (exists_profesor_curso) {
            return res.status(400).json({
                message: 'Este profesor ya esta asignado a este curso, por favor verifique'
            })
        }

        await asignacion.update({
            profesor_id: profesor_id,
            curso_id: curso_id
        })

        return res.status(200).json({
            message: 'Asignacion actualizada con exito!'
        })
    } catch (error) {

        console.log('Error al actualizar el profesor con curso asignado: ', error.message)

        return res.status(500).json({
            message: 'Error al actualizar el profesor con curso asignado',
            error: error.message
        })
    }
}

export const delete_profesor_curso = async (req, res, next) => {
    try {

        const { asignacion_id } = req.body

        if (!asignacion_id) {
            return res.status(400).json({
                message: 'El id de la asignacion es obligatorio, por favor verifique'
            })
        }

        const asignacion = await profesor_curso.findOne({
            where: {
                asignacion_id: asignacion_id
            }
        })

        if (!asignacion) {
            return res.status(404).json({
                message: 'Esta asignacion no esta registrada, por favor verifique'
            })
        }

        await asignacion.destroy()

        return res.status(200).json({
            message: 'Asignacion eliminada con exito!'
        })

    } catch (error) {

        console.log('Error al eliminar la asignacion: ', error.message)

        return res.status(500).json({
            message: 'Error al eliminar la asignacion',
            error: error.message
        })
    }
}

//funcion para usuario profesor
export const list_profesor_curso = async (req, res, next) => {
    try {

        const { profesor_id } = req.body

        if (!profesor_id) {
            return res.status(400).json({
                message: 'El id del profesor es obligatorio, por favor verifique'
            })
        }

        const Cursos = await profesor_curso.findAll({
            where: {
                profesor_id: profesor_id
            },
            include: [{
                model: curso,
                as: 'curso',
                include: [{
                    model: idioma,
                    as: 'idioma'
                }],
                attributes: ['curso_id', 'idioma_id', 'nombre', 'descripcion', 'programa', 'modalidad', 'horario', 'activo']
            }]
        })

        if (Cursos.length === 0) {
            return res.status(404).json({
                message: 'No tienes cursos asignados!'
            })
        }

        return res.status(200).json({
            message: 'Tus cursos asignados',
            data: Cursos
        })
    } catch (error) {

        console.log('Error al obtener tus cursos: ', error.message)

        return res.status(500).json({
            message: 'Error al obtener cursos',
            error: error.message
        })
    }
}

