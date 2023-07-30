import { Module, NotFoundException } from "@nestjs/common";
import { BaseEntity } from "src/domain/base.entity";

export interface Caching<T extends BaseEntity> {
    cacheItem: (key: string, item: T) => void;
    getCache: (key: string) => T[];
    getItem: (key: string, id: string) => T;
    getNextItemFromCache: (key: string) => T;
    getLockedItems: (key: string) => T[];
    clearLockedItemsCache: (key: string) => void;
    addLockedItem: (key: string, item: T) => void;
    initCache: (key: string) => void;
}

class CachingImplement<T extends BaseEntity> implements Caching<BaseEntity> {
    public cachedItems: { [key: string]: T[] };
    public lockedItems: { [key: string]: T[] };

    constructor() {
        this.cachedItems = {};
        this.lockedItems = {};
    }

    initCache(key: string): void {
        this.cachedItems[key] = [];
        this.lockedItems[key] = [];
    }

    clearLockedItemsCache(key: string): void {
        this.lockedItems[key] = [];
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

    addLockedItem(key: string, item: T): void {
        if (this.lockedItems[key] !== undefined) {
            this.lockedItems[key].push(item);
        } else {
            this.lockedItems[key] = [];
            this.lockedItems[key].push(item);
        }
    }

    getLockedItems(key: string): T[] {
        return this.lockedItems[key];
    }

    getNextItemFromCache(key: string): T {
        if (this.cachedItems[key] === undefined) {
            throw new NotFoundException();
        }
        return this.fetchNext(0, this.cachedItems[key].length, this.lockedItems[key], this.cachedItems[key]);
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