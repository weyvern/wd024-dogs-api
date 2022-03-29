import express from 'express';
import dogsRouter from './routes/dogsRouter.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/dogs', dogsRouter);
app.get('/', (req, res) => res.send('Dogs API'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
