import { DataTypes } from "sequelize";
import { sequelize } from "../database/db_connection.js";

const asistencia = sequelize.define('asistencias', {
    asistencia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cursos',
            key: 'curso_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'usuario_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    asistencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'asistencias',
    timestamps: false
})

export default asistencia