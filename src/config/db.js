import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Validate all required environment variables
const validateEnvironmentVariables = () => {
  // Check for DATABASE_URL (primary connection method)
  if (process.env.DATABASE_URL) {
    console.log("DATABASE_URL carregada");
    return true;
  }
  
  // If DATABASE_URL is not defined, check for individual connection parameters
  const requiredVars = ['DB_NAME', 'DB_USERNAME', 'DB_PASSWORD', 'DB_HOST'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`As seguintes variáveis de ambiente não estão definidas: ${missingVars.join(', ')}. Verifique seu arquivo .env.`);
    return false;
  }
  
  console.log("Todas as variáveis de ambiente necessárias estão definidas");
  return true;
};

validateEnvironmentVariables();

// Create Sequelize instance based on available environment variables
export const database = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
      }
    );

export const syncDatabase = async () => {
  // Validate environment variables before attempting to connect
  if (!validateEnvironmentVariables()) {
    throw new Error("Faltam variáveis de ambiente necessárias para a conexão com o banco de dados.");
  }

  try {
    await database.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
    throw error; // Re-throw to allow proper error handling upstream
  }
};

export default { database, syncDatabase };