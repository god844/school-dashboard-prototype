import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import jobsRouter from './routes/jobs';

import fs from 'fs';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

console.log('--- DEBUG START ---');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${PORT}`);
console.log(`__dirname: ${__dirname}`);
const clientDistPath = path.join(__dirname, '../../client/dist');
console.log(`Client Dist Path: ${clientDistPath}`);
console.log(`Path exists: ${fs.existsSync(clientDistPath)}`);
if (fs.existsSync(clientDistPath)) {
    console.log(`Contents: ${fs.readdirSync(clientDistPath).join(', ')}`);
}
console.log('--- DEBUG END ---');

app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobsRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, prisma };
