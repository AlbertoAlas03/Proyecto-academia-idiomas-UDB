import Usuario from '../models/usuario.js';
import Idioma from '../models/idioma.js';
import Curso from '../models/curso.js';
import Evaluacion from '../models/evaluacion.js';
import Inscripcion from '../models/inscripcion.js'
import Nota from '../models/nota.js';
import Asistencia from '../models/asistencia.js';
import ProfesorCurso from '../models/profesor_curso.js';

const iniciar_relaciones = () => {

    // Relaciones de Usuario
    Usuario.hasMany(Inscripcion, {
        foreignKey: 'estudiante_id',
        as: 'inscripciones'
    });

    Usuario.hasMany(ProfesorCurso, {
        foreignKey: 'profesor_id',
        as: 'cursos_asignados'
    });

    Usuario.hasMany(Evaluacion, {
        foreignKey: 'profesor_id',
        as: 'evaluaciones_creadas'
    });

    Usuario.hasMany(Nota, {
        foreignKey: 'estudiante_id',
        as: 'notas'
    });

    Usuario.hasMany(Asistencia, {
        foreignKey: 'estudiante_id',
        as: 'asistencias'
    });

    // Relaciones de Idioma
    Idioma.hasMany(Curso, {
        foreignKey: 'idioma_id',
        as: 'cursos'
    });

    // Relaciones de Curso
    Curso.belongsTo(Idioma, {
        foreignKey: 'idioma_id',
        as: 'idioma'
    });

    Curso.hasMany(Inscripcion, {
        foreignKey: 'curso_id',
        as: 'inscripciones'
    });

    Curso.hasMany(ProfesorCurso, {
        foreignKey: 'curso_id',
        as: 'profesores_asignados'
    });

    Curso.hasMany(Evaluacion, {
        foreignKey: 'curso_id',
        as: 'evaluaciones'
    });

    Curso.hasMany(Asistencia, {
        foreignKey: 'curso_id',
        as: 'asistencias'
    });

    // Relaciones de Matricula
    Inscripcion.belongsTo(Usuario, {
        foreignKey: 'estudiante_id',
        as: 'estudiante'
    });

    Inscripcion.belongsTo(Curso, {
        foreignKey: 'curso_id',
        as: 'curso'
    });

    // Relaciones de ProfesorCurso
    ProfesorCurso.belongsTo(Usuario, {
        foreignKey: 'profesor_id',
        as: 'profesor'
    });

    ProfesorCurso.belongsTo(Curso, {
        foreignKey: 'curso_id',
        as: 'curso'
    });

    // Relaciones de Evaluacion
    Evaluacion.belongsTo(Curso, {
        foreignKey: 'curso_id',
        as: 'curso'
    });

    Evaluacion.belongsTo(Usuario, {
        foreignKey: 'profesor_id',
        as: 'profesor'
    });

    Evaluacion.hasMany(Nota, {
        foreignKey: 'evaluacion_id',
        as: 'notas'
    });

    // Relaciones de Nota
    Nota.belongsTo(Evaluacion, {
        foreignKey: 'evaluacion_id',
        as: 'evaluacion'
    });

    Nota.belongsTo(Usuario, {
        foreignKey: 'estudiante_id',
        as: 'estudiante'
    });

    // Relaciones de Asistencia
    Asistencia.belongsTo(Curso, {
        foreignKey: 'curso_id',
        as: 'curso'
    });

    Asistencia.belongsTo(Usuario, {
        foreignKey: 'estudiante_id',
        as: 'estudiante'
    });
}

export default iniciar_relaciones




