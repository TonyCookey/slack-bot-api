const express = require('express')
const cors = require('cors')
const morgan = require('morgan');

const app = express()


const responsesController = require('./controllers/responses.controller')


app.use(cors());
app.use(morgan('combined'));

app.use(express.json());

app.get('/users/responses/:user_email', responsesController.GetUserResponse)
app.get('/users/responses', responsesController.GetAllResponses)

app.get('/users/responses/:question/:user_email', responsesController.GetUserQuestionResponse)
app.post('/users/responses', responsesController.SaveUserResponses)

module.exports = app