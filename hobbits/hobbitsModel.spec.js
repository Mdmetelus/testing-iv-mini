const request = require('supertest');

const db = require('../data/dbConfig');
const hobbitModel = require('./hobbitsModel');

// before and after each 0r before and after All

afterEach(async () => {
    await db('hobbits').truncate();
})

describe('hobbits model', () => {
    it('should insert provided hobbits', async () => {
        let hobbit = await hobbitModel.insert({name: 'bilbo'});

        const hobbits = await db('hobbits');

        expect(hobbits).toHaveLength(1);
        expect(hobbit.name).toEqual('bilbo');
    });

    it('should insert provided hobbit', async () => {
        const hobbit = await hobbitModel.insert({ name: 'bilbo'});

        let hobbits = await db('hobbits');
        expect(hobbits).toHaveLength(1);
        expect(hobbit.name).toEqual('bilbo');

        await hobbitModel.insert({ name: 'sam' });
        hobbits = await db('hobbits');
        expect(hobbits).toHaveLength(2);
    })
});