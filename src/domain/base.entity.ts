import { AggregateRoot } from "@nestjs/cqrs";

export class BaseEntity extends AggregateRoot {
    public readonly id: string;
}