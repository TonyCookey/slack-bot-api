require('dotenv').config({ path: __dirname + '/.env' })
const http = require('http');


const express = require('express')
const cors = require('cors')
const morgan = require('morgan');

const app = express()

const server = http.createServer(app);

const responsesController = require('./controllers/responses.controller')


const { mongoConnect } = require('./mongo');

const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(morgan('combined'));

app.use(express.json());

app.get('/users/responses/:user_email', responsesController.GetUserResponse)
app.get('/users/responses', responsesController.GetAllResponses)

app.get('/users/responses/:question/:user_email', responsesController.GetUserQuestionResponse)
app.post('/users/responses', responsesController.SaveUserResponses)


async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();