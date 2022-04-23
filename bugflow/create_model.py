from distutils.file_util import write_file
from itertools import islice
import json
from os import write
from sys import argv
import markovify


def load(file: str):
    json_file = open(file)
    for line in json_file:
        line = line.strip()
        if not line:
            continue
        yield json.loads(line)


def main():
    file = argv[1]
    print(f"Loading from {file}\n")

    title_model = markovify.Text("Issue.")
    text_model = markovify.Text("What.")

    for issue in load(file):
        try:
            if "pr" in issue and issue["pr"]:
                continue
            title = issue["title"]
            if title:
                model = markovify.Text(title, retain_original=False, well_formed=False)
                title_model = markovify.combine([model, title_model])

            text = issue["text"]
            if text:
                model = markovify.Text(text, retain_original=False, well_formed=False)
                text_model = markovify.combine([model, text_model])
        except Exception as ex:
            print(f"Skipping issue '{(issue['title'])}'")

    print("Saving models\n")

    titles = open("titles.json", "w")
    titles.write(title_model.compile().to_json())
    titles.close()

    texts = open("texts.json", "w")
    texts.write(text_model.compile().to_json())
    texts.close()

main()
