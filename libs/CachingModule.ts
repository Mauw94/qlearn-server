import { Module, NotFoundException } from "@nestjs/common";
import { BaseEntity } from "src/domain/base.entity";

export interface Caching<T extends BaseEntity> {
    cacheItem: (key: string, item: T) => void;
    getCache: (key: string) => T[];
    getItem: (key: string, id: string) => T;
    getNotAvailableItems: () => T[];
    clearCache: (key: string) => void;
    clearNotAvailableItemsCache: () => void;
}

class CachingImplement<T extends BaseEntity> implements Caching<BaseEntity> {
    public cachedItems: { [key: string]: T[] };
    public notAvailableItems: T[];

    constructor() {
        this.cachedItems = {};
        this.notAvailableItems = [];
    }

    clearCache(key: string): void {
        this.cachedItems[key] = [];
    }

    clearNotAvailableItemsCache(): void {
        this.notAvailableItems = []
    }

    cacheItem(key: string, item: T): void {
        if (this.cachedItems[key] !== undefined)
            this.cachedItems[key].push(item)
        else {
            this.cachedItems[key] = []
            this.cachedItems[key].push(item)
        }
    }

    getItem(key: string, id: string): T {
        if (this.cachedItems.hasOwnProperty(key)) {
            const items = this.cachedItems[key];
            const item = items.find(x => x.id === id);
            if (item === undefined || item === null) {
                throw new NotFoundException();
            }
            return item;
        }
        throw new NotFoundException()
    }

    getCache(key: string): T[] {
        return this.cachedItems[key];
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