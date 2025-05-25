import { Sequelize } from "sequelize";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  dotenv.config();
}

if (!process.env.DATABASE_URL) {
  console.error("ERRO CRÍTICO: DATABASE_URL não está definida!");
  throw new Error("DATABASE_URL environment variable is not configured.");
}

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

export const syncDatabase = async () => {
  try {
    await database.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
};

export default { database, syncDatabase };