#!/bin/bash


export LOG_LEVEL=debug
export LRSQL_DB_DRIVER=sqlite3
export LRSQL_DB_CONNECTION=issues.db

../../letarette.sql/lrsql
