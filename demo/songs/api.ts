import Koa from "koa";
import KoaRouter from "koa-router";
import bodyparser from "koa-bodyparser";
import {
    SearchAgent,
    SearchResponse,
    searchStatusCodeToString,
} from "@letarette/client";
import { ParsedUrlQuery } from "querystring";
import { getSong, getAllSongs } from "./songdb";

async function main() {
    console.log("Connecting to NATS");

    const agent = new SearchAgent(["nats://localhost:4222"]);
    await agent.connect();

    const app = new Koa();
    const router = new KoaRouter({
        methods: ["get"],
        sensitive: true,
    });

    setupRoutes(router, agent);

    app.use(bodyparser());
    app.use(router.middleware());
    
    const port = 3000;
    console.log(`API listening on port ${port}`);
    app.listen(port);
}

function setupRoutes(router: KoaRouter, agent: SearchAgent) {
    // /songs
    router.get("/songs/:song", async (ctx, next) => {
        ctx.set("content-type", "application/json");
        ctx.set("access-control-allow-origin", "*");
        const songID = Number(ctx.params["song"]);

        try {
            const song = await getSong(songID);
            ctx.body = song;
        } catch (err) {
            ctx.throw(`Failed to fetch song: ${err}`);
        }
        return next();
    });

    // /search
    router.get("/search", async (ctx, next) => {
        ctx.set("content-type", "application/json");
        ctx.set("access-control-allow-origin", "*");
        const query = param(ctx.query, "query") ?? "";
        const pageLimit = Number(param(ctx.query, "limit") ?? 10);
        const pageOffset = Number(param(ctx.query, "offset") ?? 0);

        try {
            const result = await agent.search(
                query,
                ["docs"],
                pageLimit,
                pageOffset
            );

            const songIDList = result.Result.Hits.map((hit) => Number(hit.ID));
            const songs = await getAllSongs(songIDList);

            ctx.body = {
                response: stringifySearchResponse(result),
                songs
            };
        
        } catch (err) {
            ctx.throw(`Search request failed: ${err}`);
        }
        return next();
    });
}

function param(params: ParsedUrlQuery, key: string): string | undefined {
    const vals = params[key];
    if (Array.isArray(vals)) {
        return vals[0];
    }
    return vals;
}

function stringifySearchResponse(response: SearchResponse) {
    return {
        ...response,
        StatusText: searchStatusCodeToString(response.Status),
    };
}

main().catch((err) => {
    console.log(err);
});
