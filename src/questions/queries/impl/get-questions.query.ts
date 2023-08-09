import { IQuery } from "@nestjs/cqrs";

export class GetQuestionsQuery implements IQuery {
    constructor(readonly clientId: string) { }
}