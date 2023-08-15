import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisResult } from './redis/redis-result';

export interface Redis<T> {
    get(key: string): Promise<RedisResult<T>>;
    set(key: string, value: T): Promise<void>;
}

class RedisImplement<T> implements Redis<T> {

    async set(key: string, value: T): Promise<void> {
        const client = await this.connect();
        const serialized = JSON.stringify(value)
        await client.set(key, serialized);
    }

    async get(key: string): Promise<RedisResult<T>> {
        const client = await this.connect();
        const value: T = JSON.parse(await client.get(key));
        const result: RedisResult<T> = { value: value }

        console.log(result);

        return result;
    }

    private async connect() {
        const connection = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/`;
        const client = createClient({
            url: connection
        });

        try {
            await client.connect();
        } catch (err) {
            console.error(err);
        }

        return client;
    }
}

export const REDIS = "REDIS";

@Module({
    providers: [
        {
            provide: REDIS,
            useClass: RedisImplement
        },
    ],
    exports: [REDIS]
})
export class RedisModule { }