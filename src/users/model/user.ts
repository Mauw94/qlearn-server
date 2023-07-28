import { AggregateRoot } from "@nestjs/cqrs";

export type UserEssentialProperties = Readonly<
    Required<{
        id: string,
        username: string,
        email: string,
        password: string
    }>
>;

export type UserProperties = UserEssentialProperties;

export class User extends AggregateRoot {
    private readonly id: string;
    private readonly username: string;
    private readonly email: string;
    private readonly password: string;

    constructor(properties: UserProperties) {
        super();
        Object.assign(this, properties);
    }

}