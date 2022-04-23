import { Database, OPEN_READONLY } from "sqlite3";

const db = new Database("issues.db", OPEN_READONLY);

export interface Issue {
    id: number;
    title: string;
    text: string;
    updated: Date;
}

export function getIssue(id: number): Promise<Issue | undefined> {
    const promise = new Promise<Issue | undefined>((resolve, reject) => {
        db.get(
            "select * from issues where id = ?",
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
