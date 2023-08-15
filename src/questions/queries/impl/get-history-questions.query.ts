import { IQuery } from "@nestjs/cqrs";

export class GetHistoryQuestionsQuery implements IQuery {
    constructor(readonly clientId: string) { }
}