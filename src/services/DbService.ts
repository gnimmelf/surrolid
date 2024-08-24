import { createStore, Store } from "solid-js/store";
import Surreal from "surrealdb.js"

class DbService {
    #db: Surreal;
    #url: URL
    #isConnected: boolean = false

    constructor(datapoint: string) {
        this.#db = new Surreal()
        this.#url = new URL(`${datapoint}/rpc`)
        this.#isConnected = false
    }

    async connect(): Promise<void> {
        try {
            await this.#db.connect(this.#url.toString());
        } catch (err) {
            throw err;
        }
        this.#isConnected = true
    }

    disconnect(): void {
        if (this.#db) {
            this.#db.close();
        }
        this.#isConnected = false
    }

    getDb(): Surreal {
        return this.#db
    }

    isConnected(): boolean {
        return this.#isConnected
    }

    async getProfileDetails() {
        try {
            const result = await this.#db.query('SELECT firstName, lastName, address, phone FROM profile;')
            // TODO! Unpack result
            return result
        } catch (err) {
            throw err;
        }
    }

    async setProfileDetails(details) {
        try {
            const result = await this.#db.query('UPDATE firstName, lastName, address, phone FROM profile;', details)
            // TODO! Unpack result
            return result
        } catch (err) {
            throw err;
        }
    }

    async getAccountDetails() {
        try {
            const result = await this.#db.query('SELECT firstName, lastName, address, phone FROM profile;')
            // TODO! Unpack result
            return result
        } catch (err) {
            throw err;
        }
    }

    async setAccountDetails(details) {
        try {
            const result = await this.#db.query('UPDATE firstName, lastName, address, phone FROM profile;', details)
            // TODO! Unpack result
            return result
        } catch (err) {
            throw err;
        }
    }
}

export default DbService