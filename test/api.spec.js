const request = require('supertest');
const app = require('../app');
const {
    mongoConnect,
    mongoDisconnect,
} = require('../mongo');


describe('Slack Bot API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });


    describe('Test GET all responses', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/users/responses')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });
})