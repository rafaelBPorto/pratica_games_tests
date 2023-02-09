import app from "../src/app";
import supertest from "supertest";
import {createConsole, createName, findConsoleByName} from "./factories/consoles-factory";
import { cleanDb } from "./helpers";

const server = supertest(app);

beforeEach(async()=>{
    await cleanDb();
})

describe("GET /consoles", ()=>{
    
    it("shold respond with status 200 and console data", async ()=>{
        const _console = await createConsole();
        const response = await server.get("/consoles");
        
        expect(response.body).toEqual([{
            id: _console.id,
            name: _console.name,
        }]);
        expect(response.status).toBe(200);
    });
    
    it("shold respond with status 200 and empty console data when DB is empty", async ()=>{
        const response = await server.get("/consoles");
        
        expect(response.body).toEqual([]);
        expect(response.status).toBe(200);
    });
});

describe("GET /consoles/:id", ()=>{
    
    it("shold respond with status 200 and console data", async ()=>{
        const _console = await createConsole();
        const response = await server.get(`/consoles/${_console.id}`);

        expect(response.body).toEqual({
            id: _console.id,
            name: _console.name
        });
        expect(response.status).toBe(200);
    });

    it("shold respond with status 404 when consoleId don't exist", async ()=>{
        const response = await server.get(`/consoles/-1`);
        expect(response.status).toBe(404);
    });
});

describe("POST /consoles", ()=>{
    it("shold respond with status 422 with body empty", async()=>{
        const response = await server.post("/consoles").send()
        expect(response.status).toBe(422);
    })

    it("shold respond with status 422 with body incorrect value at property name", async()=>{
        const response = await server.post("/consoles").send({name: 123})
        expect(response.status).toBe(422);
    })


    it("shold respond with status 422 with body incorrect name of property ", async()=>{
        const response = await server.post("/consoles").send({anyName: "abc"})
        expect(response.status).toBe(422);
    })

    it("shold respond with status 201 and console data when create console", async()=>{
        const name = createName()
        const createConsole = await server.post("/consoles").send({name: name});
        const console = await findConsoleByName(name)
        expect(createConsole.status).toBe(201);
        expect(console.name).toBe(name);
    })
})

