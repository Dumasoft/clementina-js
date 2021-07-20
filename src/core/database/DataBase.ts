import { Table } from './interfaces/Table';

export class DataBase {
    connector?: IDBDatabase
    tables: Array<Table>

    constructor(name_database: string, version: number, tables: Array<Table>) {
        this.tables = tables

        const response: IDBOpenDBRequest = indexedDB.open(name_database, version)
        response.onupgradeneeded = (response: IDBVersionChangeEvent) => this.upgrade_needed(response)
        response.onsuccess = (response: Event) => this.on_success(response)
        response.onerror = this.on_success
    }

    create_table(name_table: string, options?: IDBObjectStoreParameters) {
        console.log('tabla creada')
        this.connector?.createObjectStore(name_table, options)
    }

    insert_item(name_table: string, item: any) {
        const store = this.connector?.transaction(name_table, 'readwrite')
        store!.onerror = this.on_error
        const table = store!.objectStore(name_table)
        table.add(item)
    }

    upgrade_needed(response: IDBVersionChangeEvent) {
        const target = <IDBOpenDBRequest>response.target!
        this.connector = target.result

        for (const item of this.tables) {
            this.create_table(item.name, item.options)
        }

        console.log('-----UPGRADE--------')
        console.log(response.target);
    }

    on_success(response: Event) {
        const target = <IDBOpenDBRequest>response.target!
        this.connector = target.result
        console.log('-----SUCCESS--------')
        console.log(response.target);
    }

    on_error(error: Event) {
        console.log('-----ERROR--------')
        console.log(error);
    }
}
