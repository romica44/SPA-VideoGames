const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false 
    },    
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
   
    released: {
      type: DataTypes.STRING,
      
    },
    
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    }, 
    
    platforms: {  //platform: { "id": 1, "name": "PC", "slug": "pc"}
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull:false
    },
   
    background_image:{
      type: DataTypes.STRING,
      allowNull: false
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },

  {
    timestamps: false
  });
};
