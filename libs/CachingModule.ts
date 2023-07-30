import { Module, NotFoundException } from "@nestjs/common";
import { BaseEntity } from "src/domain/base.entity";

export interface Caching<T extends BaseEntity> {
    cacheItem: (key: string, item: T) => void;
    getCache: (key: string) => T[];
    getItem: (key: string, id: string) => T;
    getNextItemFromCache: (key: string) => T;
    getNotAvailableItems: (key: string) => T[];
    initCache: (key: string) => void;
    clearNotAvailableItemsCache: (key: string) => void;
    addItemToNotAvailableItems: (key: string, item: T) => void;
}

class CachingImplement<T extends BaseEntity> implements Caching<BaseEntity> {
    public cachedItems: { [key: string]: T[] };
    public notAvailableItems: { [key: string]: T[] };

    constructor() {
        this.cachedItems = {};
        this.notAvailableItems = {};
    }

    initCache(key: string): void {
        this.cachedItems[key] = [];
        this.notAvailableItems[key] = [];
    }

    clearNotAvailableItemsCache(key: string): void {
        this.notAvailableItems[key] = [];
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

    addItemToNotAvailableItems(key: string, item: T): void {
        if (this.notAvailableItems[key] !== undefined) {
            this.notAvailableItems[key].push(item);
        } else {
            this.notAvailableItems[key] = [];
            this.notAvailableItems[key].push(item);
        }
    }

    getNotAvailableItems(key: string): T[] {
        return this.notAvailableItems[key];
    }

    getNextItemFromCache(key: string): T {
        if (this.cachedItems[key] === undefined) {
            throw new NotFoundException();
        }
        return this.fetchNext(0, this.cachedItems[key].length, this.notAvailableItems[key], this.cachedItems[key]);
    }

    private fetchNext(index: number, maxIndex: number, notAvailableItems: T[], cachedItems: T[]): T {
        if (index === maxIndex) {
            throw new NotFoundException();
        }
        let item = cachedItems[index];
        if (notAvailableItems.find(x => x.id === item.id)) {
            return this.fetchNext(++index, maxIndex, notAvailableItems, cachedItems);
        }
        return item;
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