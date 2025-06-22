import nota from "../models/nota.js"
import evaluacion from "../models/evaluacion.js"
import usuario from "../models/usuario.js"
import { Op } from "sequelize"

export const list_notas_estudiante = async (req, res, next) => {
    try {

        const { estudiante_id } = req.body

        if (!estudiante_id) {
            return res.status(400).json({
                message: 'El id del estudiante es obligatorio, por favor verifique'
            })
        }

        const notas = await nota.findAll({
            where: {
                estudiante_id: estudiante_id
            },
            include: [{
                model: evaluacion,
                as: 'evaluacion',
                attributes: ['evaluacion_id', 'nombre', 'descripcion', 'porcentaje']
            }]
        })

        if (notas.length === 0) {
            return res.status(404).json({
                message: 'No existen notas registradas para este estudiante'
            })
        }

        return res.status(200).json({
            message: 'Notas del estudiante',
            data: notas
        })

    } catch (error) {

        console.log('Error al obtener las notas del estudiante: ', error.message)

        return res.status(500).json({
            message: 'Error al obtener las notas del estudiante',
            error: error.message
        })
    }
}

export const add_nota = async (req, res, next) => {
    try {

        const { evaluacion_id, estudiante_id, puntaje_obtenido } = req.body

        if (!evaluacion_id || !estudiante_id || !puntaje_obtenido) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios, por favor verifique'
            })
        } else if (puntaje_obtenido <= 0 || puntaje_obtenido > 10) {
            return res.status(400).json({
                message: 'Hay un error con el puntaje obtenido, por favor verifique'
            })
        }

        const Evaluacion = await evaluacion.findOne({
            where: {
                evaluacion_id: evaluacion_id
            }
        })

        if (!Evaluacion) {
            return res.status(404).json({
                message: 'Esta evaluacion no esta registrada, por favor verifique'
            })
        }

        const estudiante = await usuario.findOne({
            where: {
                usuario_id: estudiante_id
            }
        })

        if (!estudiante) {
            return res.status(404).json({
                message: 'Este estudiante no esta registrado, por favor verifique'
            })
        }

        const exists_evaluacion_registrada = await nota.findOne({
            where: {
                evaluacion_id: evaluacion_id,
                estudiante_id: estudiante_id
            }
        })

        if (exists_evaluacion_registrada) {
            return res.status(400).json({
                message: 'Esta evaluacion ya esta registrada con su respectiva nota para este estudiante, por favor verifique'
            })
        }

        const nota_final = parseFloat((Evaluacion.porcentaje * puntaje_obtenido).toFixed(2));

        await nota.create({
            evaluacion_id: evaluacion_id,
            estudiante_id: estudiante_id,
            puntaje_obtenido: puntaje_obtenido,
            nota_final: nota_final
        })

        return res.status(200).json({
            message: 'Nota registrada con exito!'
        })

    } catch (error) {

        console.log('Error al agregar la nota: ', error.message)

        return res.status(500).json({
            message: 'Error al agregar la nota',
            error: error.message
        })
    }
}

export const update_nota = async (req, res, next) => {
    try {

        const { nota_id, evaluacion_id, estudiante_id, puntaje_obtenido } = req.body

        if (!nota_id || !evaluacion_id || !puntaje_obtenido || !estudiante_id) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios, por favor verifique'
            })
        }

        const Nota = await nota.findOne({
            where: {
                nota_id: nota_id
            }
        })

        if (!Nota) {
            return res.status(404).json({
                message: 'Este registro de nota no existe, por favor verifique'
            })
        }

        const Evaluacion = await evaluacion.findOne({
            where: {
                evaluacion_id: evaluacion_id
            }
        })

        if (!Evaluacion) {
            return res.status(404).json({
                message: 'Esta evaluacion no existe, por favor verifique'
            })
        }

        const exists_evaluacion_registrada = await nota.findOne({
            where: {
                evaluacion_id: evaluacion_id,
                estudiante_id: estudiante_id,
                nota_id: { [Op.ne]: nota_id }
            }
        })

        if (exists_evaluacion_registrada) {
            return res.status(400).json({
                message: 'Esta evaluación ya está registrada con su respectiva nota para este estudiante, por favor verifique'
            });
        }

        const nota_final = parseFloat((Evaluacion.porcentaje * puntaje_obtenido).toFixed(2));

        await Nota.update({
            evaluacion_id: evaluacion_id,
            puntaje_obtenido: puntaje_obtenido,
            nota_final: nota_final
        })

        return res.status(200).json({
            message: 'Registro de nota actualizado!'
        })

    } catch (error) {

        console.log('Error al actualizar la nota: ', error.message)

        return res.status(500).json({
            message: 'Error al actualizar la nota',
            error: error.message
        })
    }
}

export const calculo_nota_final = async (req, res, next) => {
    try {

        const { estudiante_id } = req.body

        if (!estudiante_id) {
            return res.status(400).json({
                message: 'El id del estudiante es obligatorio'
            })
        }

        const notas_estudiante = await nota.findAll({
            where: {
                estudiante_id: estudiante_id
            }
        })

        if (notas_estudiante.length === 0) {
            return res.status(404).json({
                message: 'No existen notas registradas para este estudiante, por favor verifique'
            })
        }

        const total_notas = await nota.count({
            where: {
                estudiante_id: estudiante_id
            }
        })

        const suma_notas = await nota.sum('nota_final', {
            where: {
                estudiante_id: estudiante_id
            }
        })

        const nota_final = parseFloat((suma_notas / total_notas).toFixed(2))

        return res.status(200).json({
            message: 'Nota final del estudiante',
            data: nota_final
        })

    } catch (error) {

        console.log('Error al calcular la nota final del estudiante: ', error.message)

        return res.status(500).json({
            message: 'Error al calcular la nota final del estudiante',
            error: error.message
        })
    }
}