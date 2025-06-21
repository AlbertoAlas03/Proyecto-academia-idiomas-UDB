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
                as: 'estudiante'
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