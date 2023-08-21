import { AggregateRoot } from "@nestjs/cqrs";
import { QuestionCreatedEvent } from "../events/impl/question-created.event";
import { AnsweredQuestionEvent } from "../events/impl/answered-question.event";
import { BaseEntity } from "src/domain/base.entity";

export type QuestionEssentialProperties = Readonly<
    Required<{
        id: string,
        question: string,
        answer: string
    }>
>;

export type QuestionOptionalProperties = Readonly<
    Partial<{
        guesses: number;
    }>
>;
export type QuestionProperties = QuestionEssentialProperties & QuestionOptionalProperties;

export interface IQuestion {
    answerQuestion: (answer: string) => void;
}

export class Question extends BaseEntity implements IQuestion {
    private readonly question: string;
    private readonly answer: string;
    private guesses: number;

    constructor(properties: QuestionProperties) {
        super();
        Object.assign(this, properties);
    }

    createQuestion() {
        this.apply(new QuestionCreatedEvent());
    }

    answerQuestion(answer: string): boolean {
        this.guesses += 1;
        var answerCorrect =
            this.answer.toLowerCase().trim() === answer.toLowerCase().trim();

        this.apply(new AnsweredQuestionEvent(answerCorrect));

        return answerCorrect;
    }

    // TODO increases guesses count; more than 3 send event for next question?
}