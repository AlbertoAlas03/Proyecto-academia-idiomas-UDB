import { Router } from "express";
import { list_idiomas, create_idioma, update_idioma, delete_idioma } from '../controllers/IdiomaController.js'
import { list_usuario, create_usuario, update_usuario, delete_usuario } from "../controllers/UsuarioController.js";
import { list_cursos, create_curso, update_curso, delete_curso } from "../controllers/CursoController.js";

const router = Router()

router.get('/api/test', (req, res) => {
    const data = {
        "id": 1,
        "message": "API is working"
    }
    return res.json(data)
})

//rutas para gestionar idiomas
router.get('/api/list_idiomas', list_idiomas)
router.post('/api/add_idioma', create_idioma)
router.put('/api/update_idioma', update_idioma)
router.delete('/api/delete_idioma', delete_idioma)

//rutas para gestionar usuarios
router.get('/api/list_usuarios', list_usuario)
router.post('/api/add_usuario', create_usuario)
router.put('/api/update_usuario', update_usuario)
router.delete('/api/delete_usuario', delete_usuario)

//rutas para gestionar cursos
router.get('/api/list_cursos', list_cursos)
router.post('/api/add_curso', create_curso)
router.put('/api/update_curso', update_curso)
router.delete('/api/delete_curso', delete_curso)

export default router