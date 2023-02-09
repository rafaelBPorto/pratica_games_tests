import {faker} from "@faker-js/faker"
import prisma from "config/database"
import { createConsole } from "./consoles-factory";

async function createGame() {
    const _console = await createConsole()
    const game = await prisma.game.create({
        data:{
            title: faker.name.firstName(),
            consoleId: _console.id
        }
    })
    return game
}

async function fakerGame(){
    const _console = await createConsole();
    const game = {
        title: faker.name.firstName(),
        consoleId: _console.id
    };
    return game;
}


function findGameByName(name :string){
    return prisma.game.findFirst({where:{title:name}})
}

export  {
    createGame,
    findGameByName,
    fakerGame
}