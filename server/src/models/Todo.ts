import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    favourite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "todos",
    timestamps: false,
  }
);

export default Todo;
