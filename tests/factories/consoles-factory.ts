import {faker} from "@faker-js/faker"
import prisma from "config/database"

function createConsole() {
    return prisma.console.create({
        data:{
            name: faker.name.firstName()
        }
    })
}

function createName(){
    return faker.name.firstName();
}

function findConsoleByName(name :string){
    return prisma.console.findFirst({where:{name:name}})
}

export  {
    createConsole,
    createName,
    findConsoleByName
}