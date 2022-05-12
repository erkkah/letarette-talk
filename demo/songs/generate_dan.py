from time import sleep
from random import randint, sample, shuffle
from sys import argv
import markovify
import sqlite3


def main():
    text_model = load_model("texts.json")
    title_model = load_model("titles.json")
    #title_model = markovify.combine([load_model("titles.json"), text_model], [1, 4])

    db = sqlite3.connect("songs.db", isolation_level=None)
    db.execute("PRAGMA journal_mode=WAL")
    setup_tables(db)

    num_issues = 100
    if len(argv) > 1:
        num_issues = int(argv[1])

    interval = 0
    if len(argv) > 2:
        interval = int(argv[2])

    print(
        f"Generating {num_issues} songs"
        + (f" every {interval} seconds" if interval > 0 else "")
    )

    while True:
        for _ in range(num_issues):
            [title, text] = create_song(text_model, title_model)
            if not title:
                continue
            title = make_unique_title(title, db)
            if interval < 0:
                print(f"** {title} **\n{text}")
            else:
                add_song(db, title, text)
        if interval <= 0:
            break
        else:
            sleep(interval)

    db.close()


def tweak_title(title: str) -> str:
    suffixes = [
        "alt. take",
        "live version",
        "with Harmonica",
        "reprise",
        "remix",
        "demo",
        "alt. lyrics",
    ]
    suffix = sample(suffixes, 1)[0]
    return f"{title} - {suffix}"


def make_unique_title(title: str, db: sqlite3.Connection) -> str:
    tweak_index = 0
    tweaked = title
    while not is_unique_title(tweaked, db):
        tweaked = tweak_title(title)
        if tweak_index > 0:
            tweaked = f"{tweaked} {tweak_index}"
        tweak_index += 1
    return tweaked


def is_unique_title(title: str, db: sqlite3.Connection) -> bool:
    cursor = db.execute(
        """
        select count(*) from songs
        where title = ?
        """,
        [title],
    )
    res = cursor.fetchone()[0]
    return res == 0


def setup_tables(db: sqlite3.Connection):
    db.execute(
        """
        create table if not exists songs (
            id integer primary key autoincrement,
            title text,
            text text,
            updated timestamp default current_timestamp
        );
        """
    )

    db.execute(
        """
        create trigger if not exists songs_au after update of title, text
        on songs begin
            update songs set updated = current_timestamp;
        end;
        """
    )

    db.execute(
        """
    create index if not exists songs_id_updated
        on songs(id, updated)
    """
    )

    db.execute(
        """
        create index if not exists songs_title
        on songs(title)
        """
    )


def add_song(db: sqlite3.Connection, title, text):
    db.execute("insert into songs(title, text) values(?, ?)", [title, text])
    db.commit()


def create_song(text_model, title_model):
    title = title_model.make_short_sentence(32)
    text = make_text(text_model)
    return [title, text]


def make_text(model):
    paragraphs = randint(4, 8)
    text = "\n\n".join([make_paragraph(model) for _ in range(paragraphs)])
    return text


def make_paragraph(model):
    sentences = randint(4, 6)
    paragraph = "\n".join([model.make_short_sentence(64) for _ in range(sentences)])
    return paragraph


def load_model(file: str):
    model_file = open(file)
    model_data = model_file.read()
    model = markovify.Text.from_json(model_data)
    model_file.close()
    return model


main()
