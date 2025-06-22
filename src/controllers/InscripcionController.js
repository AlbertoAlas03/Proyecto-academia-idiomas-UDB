import curso from "../models/curso.js"
import inscripcion from "../models/inscripcion.js"
import usuario from "../models/usuario.js"

export const list_estudiantes = async (req, res, next) => {
    try {

        const { curso_id } = req.body

        if (!curso_id) {
            return res.status(400).json({
                message: 'El id del curso es obligatorio, por favor verifique'
            })
        }

        const estudiantes = await inscripcion.findAll({
            where: {
                curso_id: curso_id
            },
            include: [{
                model: usuario,
                as: 'estudiante',
                attributes: ['usuario_id', 'nombre', 'apellido', 'email', 'telefono', 'activo']
            }]
        })

        if (estudiantes.length === 0) {
            return res.status(404).json({
                message: 'No existen estudiantes inscritos en este curso'
            })
        }

        return res.status(200).json({
            message: 'Estudiantes del curso',
            data: estudiantes
        })

    } catch (error) {

        console.log('Error al obtener los estudiantes: ', error.message)

        return res.status(500).json({
            message: 'Error al obtener los estudiantes',
            error: error.message
        })
    }
}

export const inscripcion_estudiante = async (req, res, next) => {
    try {

        const { estudiante_id, curso_id } = req.body

        if (!estudiante_id || !curso_id) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios, por favor verifique'
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

        const inscripcion_exists = await inscripcion.findOne({
            where: {
                curso_id: curso_id,
                estudiante_id: estudiante_id
            }
        })

        if (inscripcion_exists) {
            return res.status(400).json({
                message: 'Ya estas registrado en este curso, por favor verifica'
            })
        }

        const verify_hours = await inscripcion.findAll({
            where: {
                estudiante_id: estudiante_id
            },
            include: [{
                model: curso,
                as: 'curso',
                attributes: ['horario']
            }]
        })

        const error_hours = verify_hours.some(ins => ins.curso.horario === Curso.horario)

        if (error_hours) {
            return res.status(400).json({
                message: 'Ya estas inscrito a un curso con el mismo horario, por favor verifica'
            })
        }

        await inscripcion.create({
            estudiante_id: estudiante_id,
            curso_id: curso_id
        })

        return res.status(200).json({
            message: 'Inscripción exitosa'
        })

    } catch (error) {

        console.log('Error al inscribirse al curso: ', error.message)

        return res.status(500).json({
            message: 'Error al inscribirse al curso',
            error: error.message
        })

    }
}