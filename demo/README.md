# Letarette demo "backend"

This is a small and contrived demo backend hack that makes the presentation search page work.

The system generates random song lyrics, based on a corpus of lyrics downloaded from Genius.
These random song lyrics are then inserted into a sqlite database that acts as the **primary storage** for the demo.

## Downloading the corpus

Given that you have run `npm install` in the parent directory, run the following to pull all Steely Dan songs from the Genius database to the file `songs.json`.
Head over to Genius and get an api key.

In the `songs` directory:

```console
$ GENIUS_KEY=mysecretkey npx ts-node fetch_dan_songs.ts > songs.json
```

> Note: The resulting corpus is not perfect, and will need a bit of manual editing to generate "nicer" lyrics. But it works for a demo.

## Building the lyrics model

Make sure you have a python 3 environment with the required packages installed.

In many cases, this is what you want to do:

* `python3 -mvenv env`
* `source env/bin/activate`
* `pip install -r requirements.txt`

Now, run 
```console
$ python create_dan_model.py songs.json
```

This will create the files  `titles.json` and `texts.json`, containing the models for the generator.

## Running the generator

The following will create 1000 random Steely Spam songs, and insert them into the `songs.db` sqlite file.

```console
$ python generate_dan_songs.py 1000
```

To make the generator run continously add a second argument for the number of seconds to sleep between generation bursts.

The following generates 1000 songs roughly every 5 seconds:

```console
$ python generate_dan_songs.py 1000 5
```

## Running the search system

It is assumed that the different components are run in separate terminal windows or tabs here.

### Start the NATS server

On my Mac, the NATS server can be fetched using Homebrew. It is started like this:

```console
$ nats-server
```

### Start the Letarette index

Download [Letarette](https://letarette.io) and make sure it is on path.

Go to the `cluster/1_1` directory and run:

```console
$ ./start.sh
```

### Start the document manager

Download [letarette.sql](https://github.com/erkkah/letarette.sql) and make sure it is on path.

Go to the `docmgr` directory and run:

```console
$ ./docmgr.sh
```

### Start the API

Go to the `songs` directory and run:

```console
$ ./api.sh
```

### That's it :)
