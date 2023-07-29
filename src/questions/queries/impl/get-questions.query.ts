import { IQuery } from "@nestjs/cqrs";

export class GetQuestionsQuery implements IQuery {
    constructor(readonly key: string) { }
}