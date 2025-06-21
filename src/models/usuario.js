import { DataTypes } from "sequelize";
import { sequelize } from '../database/db_connection.js'

const usuario = sequelize.define('usuarios', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Formato de email no válido"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /^(2|6|7)\d{7}$|^(2|6|7)\d{3}-\d{4}$/,
                msg: "Formato de telefono no válido"
            }
        }
    },
    rol: {
        type: DataTypes.ENUM('estudiante', 'profesor', 'administrador'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['estudiante', 'profesor', 'administrador']],
                msg: 'Solamente se admiten 3 tipos de roles, por favor verifique'
            }
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'usuarios',
    timestamps: false
})

export default usuario