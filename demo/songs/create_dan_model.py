import json
from sys import argv
import markovify

def load(file: str):
    json_file = open(file)
    return json.loads(json_file.read())

def main():
    file = argv[1]
    print(f"Loading from {file}\n")

    state_size = 2

    title_model = markovify.NewlineText("Brooklyn", state_size=state_size)
    text_model = markovify.NewlineText("Knows the charmer under me", state_size=state_size)

    for song in load(file):
        try:
            title = song["title"]
            model = markovify.NewlineText(title, retain_original=False, well_formed=False, state_size=state_size)
            title_model = markovify.combine([model, title_model])

            lyrics = song["lyrics"]
            model = markovify.NewlineText(lyrics, retain_original=False, well_formed=False, state_size=state_size)
            text_model = markovify.combine([model, text_model])
        except Exception as ex:
            print(f"Skipping song '{(song['title'])}': {ex}")

    print("Saving models\n")

    titles = open("titles.json", "w")
    titles.write(title_model.to_json())
    titles.close()

    texts = open("texts.json", "w")
    texts.write(text_model.to_json())
    texts.close()

main()
