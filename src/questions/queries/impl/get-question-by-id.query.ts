import { IQuery } from "@nestjs/cqrs";

export class GetQuestionByIdQuery implements IQuery {
    constructor(readonly clientId: string, readonly id: string) { }
}