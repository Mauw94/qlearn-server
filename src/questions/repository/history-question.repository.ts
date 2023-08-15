import { Inject, Injectable } from "@nestjs/common";
import { REDIS, Redis } from "libs/RedisModule";

@Injectable()
export class HitstoryQuestionRepository {
    constructor() { }

    @Inject(REDIS)
    private readonly redis: Redis<any>;

    async init() {
        await this.redis.get('test');
    }

    async set(key: string, value: any) {
        await this.redis.set(key, value)
    }
}