import express from 'express';
import masterRouter from './routes/index.js';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());
app.use('/', masterRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});