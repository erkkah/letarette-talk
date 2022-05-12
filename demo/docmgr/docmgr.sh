#!/bin/bash

export LRSQL_DB_DRIVER=sqlite3
export LRSQL_DB_CONNECTION=../songs/songs.db?mode=ro

lrsql
