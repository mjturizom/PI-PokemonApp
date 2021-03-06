const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
    
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imagen:{
        type: DataTypes.STRING,
        defaultValue: null
      },
      vida: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      fuerza: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      defensa: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      velocidad: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      altura: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      peso: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      
      timestamps: false,
      createdAt: false,
    }
  );
  sequelize.define(
    "type",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unknown",
        unique: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
