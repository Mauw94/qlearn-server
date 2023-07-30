import { IQuery } from "@nestjs/cqrs";

export class GetNextQuestionQuery implements IQuery {
    constructor(readonly key: string) { }
}