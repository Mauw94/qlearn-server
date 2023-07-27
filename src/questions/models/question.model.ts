import { AggregateRoot } from "@nestjs/cqrs";
import { QuestionCreatedEvent } from "../events/impl/question-created.event";

export class Question extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data: any) {
        this.data = data;
    }

    createQuestion() {
        this.apply(new QuestionCreatedEvent(this.data));
    }
}