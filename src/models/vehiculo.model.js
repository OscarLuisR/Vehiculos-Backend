const sequelizePaginate = require('sequelize-paginate'); // OJO OJO OJO

module.exports = (sequelize, DataTypes) => {
    const Vehiculo = sequelize.define('vehiculo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'nombre can not be null'
                }
            }
        },
        fabricante: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'fabricante can not be null'
                }
            }
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'modelo can not be null'
                }
            }
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'tipo can not be null'
                }
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'color can not be null'
                }
            }
        },
        chasis: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'chasis can not be null'
                }
            }
        },
        combustible: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'combustible can not be null'
                }
            }
        }
    }, {
        timestamps: true,
    });

    sequelizePaginate.paginate(Vehiculo); // OJO OJO OJO
    
    return Vehiculo;
};