import { Song } from "../demo/songdb";
import { SearchResponse } from "@letarette/client";
import Axios, { AxiosInstance } from "axios";
import { createContext } from "preact";

export interface SongResult {
    response: SearchResponse,
    songs: Song[],
}

export class SongClient {
    private readonly axios: AxiosInstance;

    constructor(endpoint: string) {
        this.axios = Axios.create({
            baseURL: endpoint,
        });
    }

    async search(query: string, pageLimit?: number, pageOffset?: number): Promise<SongResult> {
        const limit = pageLimit ?? 5;
        const offset = pageOffset ?? 0;

        const response = await this.axios.get("/search", {
            params: {
                query,
                limit,
                offset
            },
        });
        return response.data;
    }

    async get(songID: number): Promise<Song> {
        const response = await this.axios.get(`/songs/${songID}`, {});
        return response.data;
    }
}

export const SongClientContext = createContext<SongClient|undefined>(undefined);
