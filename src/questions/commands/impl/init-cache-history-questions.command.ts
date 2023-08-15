import { ICommand } from "@nestjs/cqrs";

export class InitCacheHistoryQuestionsCommand implements ICommand {
    constructor(readonly clientId: string) { }
}