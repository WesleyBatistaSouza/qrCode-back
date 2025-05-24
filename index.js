import express from 'express';
import { syncDatabase } from './src/config/db.js';
import corsMiddleware from './src/middleware/cors.js';
import router from './src/routes/products.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
console.log('process env porta:', process.env.PORT);

app.use(corsMiddleware);
app.use(express.json());
app.use('/', router);

app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`);
    await syncDatabase();
})