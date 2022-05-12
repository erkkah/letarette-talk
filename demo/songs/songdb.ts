import { Database, OPEN_READONLY } from "sqlite3";

const db = new Database("songs.db");
db.exec("PRAGMA journal_mode=WAL");

export interface Song {
    id: number;
    title: string;
    text: string;
    updated: Date;
}

export function getSong(id: number): Promise<Song | undefined> {
    const promise = new Promise<Song | undefined>((resolve, reject) => {
        db.get(
            "select * from songs where id = ?",
            [id],
            (error: Error | null, row?: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }
            }
        );
    });
    
    return promise;
}

export function getAllSongs(idList: number[]): Promise<Song[]> {
    const promise = new Promise<Song[]>((resolve, reject) => {
        db.all(
            `select * from songs where id in (${idList.join(",")})`,
            (error: Error | null, row?: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }
            }
        )
    });

    return promise;
}
