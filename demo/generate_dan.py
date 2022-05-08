from os import read
from random import randint
from sys import argv
import markovify
import sqlite3

def main():
    text_model = load_model("texts.json")
    title_model = markovify.combine([load_model("titles.json"), text_model], [1, 3])

    db = sqlite3.connect("songs.db")
    setup_tables(db)

    num_issues = 100
    if len(argv) > 1:
        num_issues = int(argv[1])

    for _ in range(num_issues):
        [title, text] = create_song(text_model, title_model)
        print(f"** {title} **\n{text}")
        add_song(db, title, text)

    db.close()

def setup_tables(db: sqlite3.Connection):
    db.execute("""
    create table if not exists songs (
        id integer primary key autoincrement,
        title text,
        text text,
        updated timestamp default current_timestamp
    );
    """)

    db.execute("""
    create trigger if not exists songs_au after update of title, text
    on songs begin
        update songs set updated = current_timestamp;
    end;
    """)

    db.execute("""
    create index if not exists songs_id_updated
        on songs(id, updated)
    """)

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
