import { Router } from "express";
import { list_idiomas } from '../controllers/IdiomaController.js'

const router = Router()

router.get('/api/test', (req, res) => {
    const data = {
        "id": 1,
        "message": "API is working"
    }
    return res.json(data)
})

//rutas para idiomas
router.get('/api/list_idiomas', list_idiomas)

export default router