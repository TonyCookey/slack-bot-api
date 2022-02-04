require('dotenv').config({ path: __dirname + '/.env' })

const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
})

app.message('hi', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log('hello');
    await say(`Hey there <@${message.user}>!`);
});

app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log('hello');
    await say('Welcome. How are you doing?');
    await say({
        "blocks": [
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":grin: Doing Well",
                                    "emoji": true
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":neutral_face: Neutral ",
                                    "emoji": true
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":innocent: Feeling Lucky",
                                    "emoji": true
                                },
                                "value": "value-2"
                            }
                        ],
                        "action_id": "first-greeting-action"
                    }
                ]
            }
        ]
        , "text": "Responding to Initial Greeting"
    });
});

app.action('first-greeting-action', ({ ack, say }) => {
    // Acknowledge command request
    await ack();

    await say('What are your favorite hobbies');
    await say({
        "blocks": [
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":grin: Doing Well",
                                    "emoji": true
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":neutral_face: Neutral ",
                                    "emoji": true
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":innocent: Feeling Lucky",
                                    "emoji": true
                                },
                                "value": "value-2"
                            }
                        ],
                        "action_id": "second-greeting-action"
                    }
                ]
            }
        ]
        , "text": "Responding to First Greeting Action"
    });
});

app.action('second-greeting-action', ({ ack, say }) => {
    // Acknowledge command request
    await ack();

    await say('What are your favorite hobbies');
    await say({
        "blocks": [
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":grin: Doing Well",
                                    "emoji": true
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":neutral_face: Neutral ",
                                    "emoji": true
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": ":innocent: Feeling Lucky",
                                    "emoji": true
                                },
                                "value": "value-2"
                            }
                        ],
                        "action_id": "third-greeting-action"
                    }
                ]
            }
        ]
        , "text": "Responding to Second Greeting Action"
    });
});

app.action('third-greeting-action', ({ ack, say }) => {
    // Acknowledge command request
    await ack();

    await say('Thank You!');

});

// Listen for a slash command invocation
app.command('/bot', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();

    await say('Welcome. How are you doing?');
});


app.command('/view', async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();

    try {
        // Call views.open with the built-in client
        const result = await client.views.open({
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {
                type: 'message',
                // View identifier
                // callback_id: 'view_1',
                // title: {
                //     type: 'plain_text',
                //     text: 'Modal title'
                // },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: 'Welcome to a modal with _blocks_'
                        },
                        accessory: {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Click me!'
                            },
                            action_id: 'button_abc'
                        }
                    },
                    {
                        type: 'input',
                        block_id: 'input_c',
                        label: {
                            type: 'plain_text',
                            text: 'What are your hopes and dreams?'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'dreamy_input',
                            multiline: true
                        }
                    }
                ],
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                }
            }
        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
});


(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
