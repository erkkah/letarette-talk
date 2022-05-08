###  Full-text search system components

- Source data, in the **primary storage**
  - SQL database, json files, plain text, et.c.
- Index
  - Makes searching better than "grep"
- Index feeder
  - Keeps the index in sync with the primary storage
- Search interface
  - Some kind of query language and API that talks to the index
