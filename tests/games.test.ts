import app from "../src/app";
import supertest from "supertest";
import { cleanDb } from "./helpers";
import { createGame, fakerGame, findGameByName } from "./factories/games-factory";



const server = supertest(app);

beforeEach(async () => {
    await cleanDb();
})

describe("GET /games", () => {

    it("shold respond with status 200 and game data", async () => {
        const game = await createGame();
        const response = await server.get("/games")

        expect(response.body).toEqual([{
            id: game.id,
            title: game.title,
            consoleId: game.consoleId,
            Console: {
                id: expect.any(Number),
                name: expect.any(String),
            }
        }]);
        expect(response.status).toBe(200);
    });

    it("shold respond with status 200 and empty game data when DB is empty", async () => {
        const response = await server.get("/games");

        expect(response.body).toEqual([]);
        expect(response.status).toBe(200);
    });
});

describe("GET /games/:id", () => {

    it("shold respond with status 200 and game data", async () => {
        const game = await createGame();
        const response = await server.get(`/games/${game.id}`);

        expect(response.body).toEqual({
            id: game.id,
            title: game.title,
            consoleId: game.consoleId,
        });
        expect(response.status).toBe(200);
    });

    it("shold respond with status 404 when consoleId don't exist", async () => {
        const response = await server.get(`/games/-1`);
        expect(response.status).toBe(404);
    });
});

describe("POST /games", () => {
    it("shold respond with status 422 with body empty", async () => {
        const response = await server.post("/games").send()
        expect(response.status).toBe(422);
    })


    it("shold respond with status 201 and game data when create game", async () => {
        const newGame = await fakerGame();
        console.log(newGame)
        const isCreateGame = await server.post(`/games/`).send(newGame);
        const isGame = await findGameByName(newGame.title)
        expect(isCreateGame.status).toBe(201);
        expect(isGame.title).toBe(newGame.title);
    })
})


