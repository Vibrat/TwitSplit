import { Injectable } from "@angular/core";
import { Store } from "./controller/store";

@Injectable()
export class AppDataService {

    private _store: Store;    
    constructor() { this._store = new Store(); }

    public newComposer(name: string, data: any) {
        this._store.set(name, data);
    }

    public updateComposer(name: string, data: any) {
        this._store.update(name, data);
    }

    public getMessageSize(name: string): number {
        const composer = this._store.value[name];
        return Object.keys(composer).length;
    }

    public getComposer(name) {
        return this._store.select(name);
    }
}