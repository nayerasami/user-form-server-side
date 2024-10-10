"use strict";

const Attachment = function(sequelize, DataTypes){
  // class Attachment extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
 const Attachment= sequelize.define(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attachable_type: {
        type: DataTypes.ENUM("userPic", "countryFlag"),
      },
      attachable_id: {
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Attachment",
    }
  );
  Attachment.associate = (models) => {
    Attachment.belongsTo(models.user, {
      foreignKey: "attachable_id",
      constraints: false,
    });
    Attachment.belongsTo(models.countries, {
      foreignKey: "attachable_id",
      constraints: false,
      scope: {
        attachable_type: "countryFlag",
      },
    });
  };

  return Attachment;
};
 
module.exports= Attachment