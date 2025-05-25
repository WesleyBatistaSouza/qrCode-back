import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do .env SOMENTE se NÃO estiver em ambiente de produção (ou Vercel)
// No Vercel, as variáveis já são injetadas no process.env
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  dotenv.config();
}

// Uma verificação de log mais precisa
console.log("Valor de process.env.DATABASE_URL:", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error("ERRO CRÍTICO: DATABASE_URL não está definida!");
  // É bom lançar um erro aqui para parar a aplicação se a variável crucial não estiver presente
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