import { Router } from "express";
import { list_idiomas, create_idioma, update_idioma, delete_idioma } from '../controllers/IdiomaController.js'
import { list_usuario, create_usuario, update_usuario, delete_usuario, list_usuarios_profesores } from "../controllers/UsuarioController.js";
import { list_cursos, create_curso, update_curso, delete_curso } from "../controllers/CursoController.js";
import { list_profesores_cursos, asignar_profesor_curso, update_profesor_curso, delete_profesor_curso, list_profesor_curso } from "../controllers/ProfesorCursoController.js"
import { list_estudiantes } from "../controllers/InscripcionController.js"
import { list_evaluacion_curso, create_evaluacion, update_evaluacion, delete_evaluacion } from "../controllers/EvaluacionController.js"
import { list_notas_estudiante, add_nota, update_nota, calculo_nota_final } from "../controllers/NotaController.js"

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

//rutas para gestionar asignacion de profesores a cursos
router.get('/api/list_profesores_cursos', list_profesores_cursos)
router.post('/api/asignar_curso_profesor', asignar_profesor_curso)
router.put('/api/update_profesor_curso', update_profesor_curso)
router.delete('/api/delete_profesor_curso', delete_profesor_curso)

//rutas para profesor de un curso
router.get('/api/list_profesor_curso', list_profesor_curso)
router.get('/api/list_estudiante_curso', list_estudiantes)

//rutas para gestionar evaluaciones
router.get('/api/list_evaluaciones_curso', list_evaluacion_curso)
router.post('/api/add_evaluacion', create_evaluacion)
router.put('/api/update_evaluacion', update_evaluacion)
router.delete('/api/delete_evaluacion', delete_evaluacion)

//rutas para gestionar notas
router.get('/api/list_notas_estudiantes', list_notas_estudiante)
router.post('/api/add_nota_estudiante', add_nota)
router.put('/api/update_nota_estudiante', update_nota)
router.get('/api/nota_final', calculo_nota_final)

//ruta para obtener los usuarios profesores
router.get('/api/list_usuarios_profesores', list_usuarios_profesores)


export default router