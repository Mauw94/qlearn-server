import { ICommand } from "@nestjs/cqrs";
import { Difficulty } from "src/questions/models/difficulty.enum";

export class InitCacheCommand implements ICommand {
    constructor(readonly difficulty: Difficulty, readonly clientId: string) { }
}