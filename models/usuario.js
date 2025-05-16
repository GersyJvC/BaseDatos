const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true // null si viene de Google
    }
  }, {
    tableName: 'usuarios',
    timestamps: true
  });

  // Antes de guardar el usuario, hashea la contraseña si existe
  Usuario.beforeCreate(async (usuario) => {
    if (usuario.password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(usuario.password, salt);
    }
  });

  // Método para validar la contraseña ingresada con la almacenada
  Usuario.prototype.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  return Usuario;
};
