require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


//YOUR CODE HERE

const token = process.env.BOT_TOKEN
const eventsApi = require('@slack/events-api')
const slackEvents = eventsApi.createEventAdapter(process.env.SIGNING_SECRET)

const { WebClient, LogLevel } = require('@slack/web-api');
const client = new WebClient(token, {
    logLevel: LogLevel.DEBUG
});

app.use('/', slackEvents.expressMiddleware())
slackEvents.on('message', async (event) => {
    console.log(event)
    if (!event.subtype && !event.bot_id) {
        client.chat.postMessage({
            token,
            channel: event.channel,
            thread_ts: event.ts,
            text: "Hello World!"
        })
    }
})
slackEvents.on('error', async (event) => {
    console.log(event)
})
// app.use()
app.use('/my-bot', (req, res) => {
    console.log(req);
    res.status(200).send()
})



app.listen(PORT, () => {
    console.log(`Slack Bot App listening at http://localhost:${PORT}`)
})
