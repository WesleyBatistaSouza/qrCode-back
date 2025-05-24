import { DataTypes } from "sequelize";
import { database } from "../config/db.js";

export const Products = database.define(
    "products",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        posicao: {
        type: DataTypes.STRING,
        allowNull: Number,
        },
    },
    {
        tableName: "products",
        timestamps: false,
    }
);