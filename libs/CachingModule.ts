import { Module } from "@nestjs/common";

export interface Caching<T> {
    cache: (item: T) => void;
    getCache: () => T[];
    getItem: (id: number) => T;
}

class CachingImplement<T> implements Caching<T> {
    public cachedItems: T[] = [];

    cache(item: T): void {
        this.cachedItems.push(item);
    }

    getItem: (id: number) => T;

    getCache(): T[] {
        return this.cachedItems;
    }
}

export const CACHING = "Caching";

@Module({
    providers: [
        {
            provide: CACHING,
            useClass: CachingImplement
        },
    ],
    exports: [CACHING]
})
export class CachingModule { }