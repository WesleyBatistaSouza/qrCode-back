import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL", typeof process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não está definida. Verifique seu arquivo .env.");
}

console.log("DATABASE_URL carregada");

export const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// export const database = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: false,
//   }
// );

export const syncDatabase = async () => {
  try {
    await database.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
};

export default { database, syncDatabase };