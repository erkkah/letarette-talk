import { Artist, Client, Song } from "genius-lyrics";

const SteelyDan = 25769;

async function getAllSongs(artist: Artist): Promise<Song[]> {
    const songs: Song[] = [];

    const perPage = 10;

    for (let page = 1; ; page++) {
        const chunk = await artist.songs({ page, perPage });
        songs.push(...chunk);
        if (chunk.length < 1) {
            break;
        }
    }

    return songs;
}

async function main() {
    const key = process.env.GENIUS_KEY;
    if (!key) {
        console.log("Expected env var GENIUS_KEY");
        process.exit(1);
    }

    const client = new Client(key);
    const artist = await client.artists.get(SteelyDan);
    const songs = await getAllSongs(artist);
    const lyrics = await Promise.all(
        songs.map(async (song) => {
            let fetched = "";
            try {
                fetched = await song.lyrics(true);
            } catch {
                console.error(`Failed to fetch lyrics for ${song.title}`);
            }
            return {
                title: song.title,
                lyrics: fetched,
            };
        })
    );
    console.log(JSON.stringify(lyrics, null, 2));
}

(async () => main())().catch((err) => {
    console.error(err);
});
