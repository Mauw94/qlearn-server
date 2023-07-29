import { ICommand } from "@nestjs/cqrs";

export class InitCacheCommand implements ICommand {
    constructor(readonly key: string) { }
}