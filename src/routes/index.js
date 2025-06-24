import { Router } from "express";
import { list_idiomas, create_idioma, update_idioma, delete_idioma } from '../controllers/IdiomaController.js'
import { list_usuario, create_usuario, update_usuario, delete_usuario, list_usuarios_profesores, login, logout } from "../controllers/UsuarioController.js";
import { list_cursos, create_curso, update_curso, delete_curso } from "../controllers/CursoController.js";
import { list_profesores_cursos, asignar_profesor_curso, update_profesor_curso, delete_profesor_curso, list_profesor_curso } from "../controllers/ProfesorCursoController.js"
import { list_estudiantes, inscripcion_estudiante } from "../controllers/InscripcionController.js"
import { list_evaluacion_curso, create_evaluacion, update_evaluacion, delete_evaluacion } from "../controllers/EvaluacionController.js"
import { list_notas_estudiante, add_nota, update_nota, calculo_nota_final } from "../controllers/NotaController.js"
import refreshToken from "../controllers/TokensController.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router()

router.get('/api/test', (req, res) => {
    const data = {
        "id": 1,
        "message": "API is working"
    }
    return res.status(200).json(data)
})

//ruta para login
router.post('/api/login', login)

//ruta para logout
router.get('/api/logout', logout)

//ruta para refrescar token de acceso
router.post('/api/refresh_token', refreshToken)

//rutas para gestionar idiomas
router.get('/api/list_idiomas', authenticate, list_idiomas)
router.post('/api/add_idioma', authenticate, create_idioma)
router.put('/api/update_idioma', authenticate, update_idioma)
router.delete('/api/delete_idioma', authenticate, delete_idioma)

//rutas para gestionar usuarios
router.get('/api/list_usuarios', authenticate, list_usuario)
router.post('/api/add_usuario', authenticate, create_usuario)
router.put('/api/update_usuario', authenticate, update_usuario)
router.delete('/api/delete_usuario', authenticate, delete_usuario)

//rutas para gestionar cursos
router.get('/api/list_cursos', authenticate, list_cursos)
router.post('/api/add_curso', authenticate, create_curso)
router.put('/api/update_curso', authenticate, update_curso)
router.delete('/api/delete_curso', authenticate, delete_curso)

//rutas para gestionar asignacion de profesores a cursos
router.get('/api/list_profesores_cursos', authenticate, list_profesores_cursos)
router.post('/api/asignar_curso_profesor', authenticate, asignar_profesor_curso)
router.put('/api/update_profesor_curso', authenticate, update_profesor_curso)
router.delete('/api/delete_profesor_curso', authenticate, delete_profesor_curso)

//rutas para profesor de un curso
router.get('/api/list_profesor_curso', authenticate, list_profesor_curso)
router.get('/api/list_estudiante_curso', authenticate, list_estudiantes)

//rutas para gestionar evaluaciones
router.get('/api/list_evaluaciones_curso', authenticate, list_evaluacion_curso)
router.post('/api/add_evaluacion', authenticate, create_evaluacion)
router.put('/api/update_evaluacion', authenticate, update_evaluacion)
router.delete('/api/delete_evaluacion', authenticate, delete_evaluacion)

//rutas para gestionar notas
router.get('/api/list_notas_estudiantes', authenticate, list_notas_estudiante)
router.post('/api/add_nota_estudiante', authenticate, add_nota)
router.put('/api/update_nota_estudiante', authenticate, update_nota)
router.get('/api/nota_final', authenticate, calculo_nota_final)

//ruta para obtener los usuarios profesores
router.get('/api/list_usuarios_profesores', authenticate, list_usuarios_profesores)

//ruta para inscribirse a cursos
router.post('/api/inscripcion_estudiante', authenticate, inscripcion_estudiante)


export default router