import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import manager from './src/dataManager';
import socket from './src/socket';
import { modifyName } from 'rps-shared';

const app = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan('tiny'));

//====| routes |====//

app.get('/api/player/:name', (req, res) => {
    const name = modifyName(req.params.name);
    const data = manager.history[name];

    if (!data)
        return res.status(404).end();
    res.json(data);
});

app.get('/api/player/:name/:count-:page', (req, res, next) => {
    const name = modifyName(req.params.name);
    const count = Number(req.params.count);
    const page = Number(req.params.page);
    let data = manager.history[name];

    if (isNaN(count) || isNaN(page)) {
        return next();
    }

    if (!data)
        return res.status(404).end();
    data = data.sort((a, b) => b.t - a.t).slice((page - 1) * count, (page - 1) * count + count);
    res.json(data);
});

app.get('/api/players', (req, res) => {
    res.json(Array.from(manager.userlist));
});

//====| other |====//

function unknownEndpoint(req: any, res: any) {
    res.status(404).send('unknown endpoint');
}

function errorHandler(error: any, req: any, res: any, next: any) {
    console.error('Error: ' + error);

    next(error);
}

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

socket.create(server);
manager.start(socket);