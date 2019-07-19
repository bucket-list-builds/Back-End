const request = require('supertest');
const server = require('../api/server.js');


const db = require('../database/dbConfig.js');



    describe("the bucketlist router", () => {
        describe("the get endpoint", () => {
          it("should return 200", async () => {
            const res = await request(server).get("/home");
            expect(res.status).toBe(200);
          });
        });
       });