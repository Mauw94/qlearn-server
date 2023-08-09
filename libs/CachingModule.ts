import { Module, NotFoundException } from "@nestjs/common";
import { BaseEntity } from "src/domain/base.entity";

export interface Caching<T extends BaseEntity> {
    cacheItem: (clientId: string, item: T) => void;
    getCache: (clientId: string) => T[];
    getItem: (clientId: string, id: string) => T;
    getNextItemFromCache: (clientId: string) => T;
    getLockedItems: (clientId: string) => T[];
    clearLockedItemsCache: (clientId: string) => void;
    addLockedItem: (clientId: string, item: T) => void;
    initCache: (clientId: string) => void;
}

class CachingImplement<T extends BaseEntity> implements Caching<BaseEntity> {
    public cachedItems: { [clientId: string]: T[] };
    public lockedItems: { [clientId: string]: T[] };

    constructor() {
        this.cachedItems = {};
        this.lockedItems = {};
    }

    initCache(clientId: string): void {
        this.cachedItems[clientId] = [];
        this.lockedItems[clientId] = [];
    }

    clearLockedItemsCache(clientId: string): void {
        this.lockedItems[clientId] = [];
    }

    cacheItem(clientId: string, item: T): void {
        if (this.cachedItems[clientId] !== undefined)
            this.cachedItems[clientId].push(item)
        else {
            this.cachedItems[clientId] = []
            this.cachedItems[clientId].push(item)
        }
    }

    getItem(clientId: string, id: string): T {
        if (this.cachedItems.hasOwnProperty(clientId)) {
            const items = this.cachedItems[clientId];
            const item = items.find(x => x.id === id);
            if (item === undefined || item === null) {
                throw new NotFoundException();
            }
            return item;
        }
        throw new NotFoundException()
    }

    getCache(clientId: string): T[] {
        return this.cachedItems[clientId];
    }

    addLockedItem(clientId: string, item: T): void {
        if (this.lockedItems[clientId] !== undefined) {
            this.lockedItems[clientId].push(item);
        } else {
            this.lockedItems[clientId] = [];
            this.lockedItems[clientId].push(item);
        }
    }

    getLockedItems(clientId: string): T[] {
        return this.lockedItems[clientId];
    }

    getNextItemFromCache(clientId: string): T {
        if (this.cachedItems[clientId] === undefined) {
            throw new NotFoundException();
        }
        return this.fetchNext(0, this.cachedItems[clientId].length, this.lockedItems[clientId], this.cachedItems[clientId]);
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