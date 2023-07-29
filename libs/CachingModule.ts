import { Module, NotFoundException } from "@nestjs/common";
import { BaseEntity } from "src/domain/base.entity";

export interface Caching<T extends BaseEntity> {
    cacheItem: (item: T) => void;
    getCache: () => T[];
    getItem: (id: string) => T;
    getNotAvailableItems: () => T[];
    clearCache: () => void;
    clearNotAvailableItemsCache: () => void;
}

class CachingImplement<T extends BaseEntity> implements Caching<BaseEntity> {
    public cachedItems: T[];
    public notAvailableItems: T[];

    constructor() {
        this.cachedItems = [];
        this.notAvailableItems = [];
    }
    clearCache(): void {
        this.cachedItems = [];
    }

    clearNotAvailableItemsCache(): void {
        this.notAvailableItems = []
    }

    cacheItem(item: T): void {
        this.cachedItems.push(item);
    }

    getItem(id: string): T {
        const item = this.cachedItems.find(x => x.id === id);
        if (item === undefined || item === null) {
            throw new NotFoundException();
        }

        return item;
    }

    getCache(): T[] {
        return this.cachedItems;
    }

    addItemToNotAvailableItems(item: T): void {
        this.notAvailableItems.push(item);
    }

    getNotAvailableItems(): T[] {
        return this.notAvailableItems;
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