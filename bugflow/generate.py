from os import read
from random import randint
from sys import argv
import markovify
import sqlite3

def main():
    text_model = load_model("texts.json")
    title_model = load_model("titles.json")

    db = sqlite3.connect("issues.db")
    setup_tables(db)

    num_issues = 100
    if len(argv) > 1:
        num_issues = int(argv[1])

    for _ in range(num_issues):
        [title, text] = create_issue(text_model, title_model)
        add_issue(db, title, text)

    db.close()

def setup_tables(db: sqlite3.Connection):
    db.execute("""
    create table if not exists issues (
        id integer primary key autoincrement,
        title text,
        text text,
        updated timestamp default current_timestamp
    );
    """)

    db.execute("""
    create trigger if not exists issues_au after update of title, text
    on issues begin
        update issues set updated = current_timestamp;
    end;
    """)

    db.execute("""
    create index if not exists issues_id_updated
        on issues(id, updated)
    """)

def add_issue(db: sqlite3.Connection, title, text):
    db.execute("insert into issues(title, text) values(?, ?)", [title, text])
    db.commit()

def create_issue(text_model, title_model):
    title = title_model.make_short_sentence(100)
    text = make_text(text_model)
    return [title, text]

def make_text(model):
    paragraphs = randint(3, 6)
    text = "\n\n".join([make_paragraph(model) for _ in range(paragraphs)])
    return text

def make_paragraph(model):
    sentences = randint(2, 5)
    paragraph = "\n".join([model.make_sentence() for _ in range(sentences)])
    return paragraph

def load_model(file: str):
    model_file = open(file)
    model_data = model_file.read()
    model = markovify.Text.from_json(model_data)
    model_file.close()
    return model

main()
