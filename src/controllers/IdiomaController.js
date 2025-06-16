import idioma from "../models/idioma.js";

export const list_idiomas = async (req, res, next) => {
    try {
        const idiomas = await idioma.findAll()
        if (idiomas.length === 0) {
            return res.status(404).json({
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