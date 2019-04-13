const server = require('./server');
const request = require('supertest');

describe('server.js', () => {

    describe('GET /GAMES', () => { 
        it('should return a status code of 200', () => {
            return request(server)
                .get('/games')
                .then(response => {
                    expect(response.status).toBe(200);
                });
        });
        it('should return a status code of 204', () => {
            return request(server)
                .get('/emptyGames')
                .then(response => {
                    expect(response.status).toBe(204);
                });
        });
        it("should return a response body of listed games", async () => {
            const games = [
                {id: 1, title: 'Donkey Kong Country', genre: 'Platform', releaseYear: 1994},
                {id: 2, title: 'Ms. Pac-Man', genre: 'Arcade', releaseYear: 1981},
                {id: 3, title: 'Kingdom Hearts', genre: 'Action', releaseYear: 2002},
                {id: 4, title: 'Guitar Hero II', genre: 'Musical', releaseYear: 2006},
                {id: 5, title: 'Mario Kart', genre: 'Racing', releaseYear: 1992}
            ];
            const response = await request(server).get("/games");
            expect(response.body).toEqual(games);
          });
          it("should return a JSON object", async () => {
            const response = await request(server).get("/games");
            expect(response.type).toBe("application/json");
          });
          it("should return an empty array if no games are stored", async () => {
              const games = []
              const response = await request(server).get("/games");
              expect(Array.isArray(games)).toBeTruthy();
          })
    });

    describe("POST /GAMES", () => {
        it("should return a status code of 201", async () => {
          const response = await request(server)
            .post("/games")
            .send({id: 6, title: 'Kirby 64: The Crystal Shards', genre: 'Platform', releaseYear: 2000});
          expect(response.status).toEqual(201);
        });
        it("should return a status code of 422", async () => {
          const response = await request(server)
            .post("/games")
            .send({ id: 7, title: "" }); // fails because there is no title provided
          expect(response.status).toEqual(422);
        });
        it("should return posted data in the response body", async () => {
          const expectedBody = {id: 7, title: '007: GoldenEye', genre: 'Shooter', releaseYear: 1997};
          const response = await request(server)
            .post("/games")
            .send(expectedBody);
          expect(response.body).toEqual(expectedBody);
        });
        it("should return a JSON object", async () => {
          const expectedBody = {id: 8, title: 'Sonic the Hedgehog', genre: 'Platform', releaseYear: 1991};
          const response = await request(server)
            .post("/games")
            .send(expectedBody);
          expect(response.type).toBe("application/json");
        });
      });

});