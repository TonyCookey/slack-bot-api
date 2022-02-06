require('dotenv').config()

const http = require('http');

const { mongoConnect } = require('./mongo');

const app = require('./app')

const PORT = process.env.PORT || 3000

const server = http.createServer(app);


async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();