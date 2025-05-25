import express from 'express';
import { syncDatabase } from './config/db.js';
import corsMiddleware from './middleware/cors.js';
import router from './routes/products.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
console.log('process env porta:', process.env.PORT);

app.use(corsMiddleware);
app.use(express.json());
app.use('/', router);

syncDatabase().then(() => {
    console.log('Banco de dados sincronizado!');
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}


export default app;