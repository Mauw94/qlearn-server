import { User } from "./model/user";

type CreateUserOptions = Readonly<{
    id: string,
    username: string,
    email: string,
    password: string
}>;

export class UserFactory {
    create(options: CreateUserOptions) {
        return new User({ ...options });
    }
}