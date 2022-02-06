const request = require('supertest');
const app = require('../app');
const {
    mongoConnect,
    mongoDisconnect,
} = require('../mongo');

const userResponse = {
    question: "What is your favoorite hobby",
    user_email: "tonyiroegbu59",
    response: "Basketball"
}


describe('Slack Bot API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });


    describe('Test GET All User Responses', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/users/responses')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });
    describe('Test POST Save New User Response', () => {

        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/users/responses')
                .send(userResponse)
                .expect('Content-Type', /json/)
                .expect(201);
        });
    })

    describe('Test GET User Responses', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get(`/users/responses/${userResponse.user_email}`)
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test GET User Question Response', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get(`/users/responses/${userResponse.user_email}/${userResponse.question}`)
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });
})