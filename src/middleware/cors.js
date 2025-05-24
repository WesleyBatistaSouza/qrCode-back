import cors from 'cors';

const corsOptions = {
    origin: ['http://127.0.0.1:5500', process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;