const request = require('supertest');
const server= require('./server');

describe('server.js', () => {
    describe('GET / endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/');

            expect(response.status).toBe(200);
            // expect(response.status(200));
            expect(response.status).toEqual(200);
        });

        it('should respond with JSON', async () => {
            let response = await request(server).get('/');

            expect(response.type).toMatch(/json/i);
            // expect(response.type).toBe(/json/i);
            // expect(response.status(200));
            // expect(response.status).toEqual(200);
        });

        it('should send back an object with an api key', async () => {
            const expected = { api: 'up'};

            let response = await request(server).get('/');

            expect(response.body).toEqual(expected);
            // expect(response.type).toBe(/json/i);
            // expect(response.status(200));
            // expect(response.status).toEqual(200);
        });
    });


    describe('POST /greet endpoint', () => {
        it('should greet the person', async () => {
            const body = { firstName: 'Stephen', lastName: 'Bondor'};

            let response = await request(server)
                .post('/greet')
                .send(body);

            // expect(response.body).toBe(200);
            // expect(response.status(200));
            expect(response.body).toEqual({ hello: 'Stephen Bondor'});

            response = await request(server)
                .post('/greet')
                .send({ firstName: 'Kai', lastName: 'Lovingfoss'});

            expect(response.body).toEqual({ hello: 'Kai Lovingfoss'});
        });

        it('should return 400 if firstname or lastName is missing', async () => {
            let response = await request(server)
                .post('/greet')
                .send({ firstName: 'frodo'})

            expect(response.status).toBe(400);

            response = await request(server)
                .post('/greet')
                .send({ lastName: 'baggins'});
            expect(response.status).toBe(400);

        });

        // it('should respond with json', async () => {
        //     let response = await request(server).get('/');

        //     expect(response.type).toMatch(/json/i);
        //     // expect(response.type).toBe(/json/i);
        //     // expect(response.status(200));
        //     // expect(response.status).toEqual(200);
        // });

        // it('should respond with json', async () => {
        //     const expected = { api: 'up'}
            
        //     let response = await request(server).get('/');

        //     expect(response.body).toEqual(expected);
        //     // expect(response.type).toBe(/json/i);
        //     // expect(response.status(200));
        //     // expect(response.status).toEqual(200);
        // });
    });
});

//what do we care about?
//what is the format of the data, we expect json
//what status code the endpoint return, we'll check for 200 on /
//what data is the body of the request