import { Issue } from "../bugflow/issuedb";
import { SearchResponse } from "@letarette/client";
import Axios, { AxiosInstance } from "axios";

export class IssueClient {
    private readonly axios: AxiosInstance;

    constructor(endpoint: string) {
        this.axios = Axios.create({
            baseURL: endpoint,
        });
    }

    async search(query: string): Promise<SearchResponse> {
        const response = await this.axios.get("/search", {
            params: {
                query,
            },
        });
        return response.data;
    }

    async get(issueID: number): Promise<Issue> {
        const response = await this.axios.get(`/issues/${issueID}`, {});
        return response.data;
    }
}
