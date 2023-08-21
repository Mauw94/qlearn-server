import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisResult } from './redis/redis-result';

export interface Redis<T> {
    get(key: string): Promise<RedisResult<T>>;
    set(key: string, value: T): Promise<void>;
    tryConnection(): Promise<boolean>;
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

        return result;
    }

    public async tryConnection(): Promise<boolean> {
        const connection = process.env.REDIS_URL;
        const client = createClient({
            url: connection
        });

        try {
            await client.connect();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    private async connect() {
        const connection = process.env.REDIS_URL;
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