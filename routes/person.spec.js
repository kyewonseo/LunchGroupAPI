const assert = require('assert');
const supertest = require('supertest');

let server = supertest.agent('http://localhost:3333/v1');

describe('Person api test.', function () {

    it('/GET http should retrun the statusCode 200', function (done) {
        server.get('/persons')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log('err=>', err);
                }
                assert.equal(200, res.status)
                done();
            })
    });
})
