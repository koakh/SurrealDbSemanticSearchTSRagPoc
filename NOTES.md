# NOTES

## Links

- [tsx](https://tsx.is/getting-started)
- [surrealdb.js](https://www.npmjs.com/package/surrealdb.js)

## ChatGPT

- [ChatGPT](https://chatgpt.com/c/3336d958-9754-4930-83ae-dd649b663f3b)

great chat, about vector ebbebedings, split chunks, rag and other cool stuff to implemnt

## TLDR

```shell
$ surreal start --allow-net --auth --user root --pass root --bind 0.0.0.0:8000 file://database
```

## Errors

## ResponseError: There was a problem with the database: I/O error: Too many open files (os error 24) at Surreal.create

use the fs-extra, see `utils.ts`

Due to the async nature of node, your process is trying to open more files than allowed (8192) so it produces an error. Each iteration in your loop starts reading a file and then it immediately continues with the next iteration.

- [nodejs too many open files causes an error](https://stackoverflow.com/questions/49672964/nodejs-too-many-open-files-causes-an-error)
- [node and Error: EMFILE, too many open files: Use the latest fs-extra](https://stackoverflow.com/a/62017545)

```shell
$ npm i fs-extra
$ npm i --save-dev @types/fs-extra
```

`fs-extra` adds file system methods that aren't included in the native fs module and adds promise support to the fs methods. It also uses graceful-fs to prevent EMFILE errors. It should be a drop in replacement for `fs`

## Some Notes about Embedding Speed

```shell
      created: [embedding_search:wbfidv8m6e59utbpk30w], 'A Room with a View by E. M. Forster', chunkIndex: 503/505
  created: [embedding_search:d5kpbo46ojvc8uqlczfy], 'A Room with a View by E. M. Forster', chunkIndex: 504/505
    created 'A Room with a View by E. M. Forster', elapsedTime: {"hours":0,"minutes":59,"seconds":44,"ms":3584486}
```

## Fix: When restart Database, vector search stop working, outcome a empty array []

**When restart Database, vector search stop working, outcome a empty array []**

the problem:
after we create scheme and index(*1) and some vector embeddings,
vector search is working flawless with queries(*2),
but after restart the surreal server, the same queries that work previously don't work any more, resulting in a empty array []

the hack solution: re-create the index after server start
after struggling I found that we must need to re-create the index(*1) again after server start,
is this the expected behaviour?
from my user perspective it seems a bug, and it is a bit annoying because until we find the problem we can´t search anything, and start recreate the whole rag embedding's, and it a long process like everybody knows

```shell
# first start server
$ surreal start --log info --allow-net --auth --user root --pass root --bind 0.0.0.0:8000 file://database
```

```sql
-- scheme and index's (*1)
define index index_hnsw_embedding_search_embedding on embedding_search fields embedding hnsw dimension 1024 dist euclidean efc 150 m 12;
define field if not exists embedding on table embedding_search type array<float> assert array::len($value) = 1024;
```

we add some rag vector embeddings here.......test with queries

```sql
-- test semantic search (*2)
let $tb = 'embedding_search';
let $ollama_embeddings_endpoint = "http://192.168.1.84:11434/api/embeddings";
let $payload_search = { "model": "mxbai-embed-large", "prompt": "Represent this sentence for searching relevant passages: What is the best way to help with freeCodeCamp.org?" };
-- get embedding search
let $embedding_search = http::post($ollama_embeddings_endpoint, $payload_search).embedding;
-- return $embedding_search;
select title, chunkText, vector::distance::euclidean($embedding_search, embedding) as distance from type::table($tb) where embedding <|20,150|> $embedding_search;
-- outcome
[
  {
    chunkText: "# How to Translate freeCodeCamp's resources",
    distance: 12.193328775382867f,
    title: 'fcc-docs/how-to-translate-files.md'
  },
  {
    chunkText: "## What do I need to know to contribute to the codebase?

  freeCodeCamp runs on a modern JavaScript stack. If you're interested in contributing to our codebase, you will need some familiarity with JavaScript and some of the technologies we use like Node.js, MongoDB, OAuth 2.0, React, Gatsby, and Webpack.",
    distance: 12.390875505430046f,
    title: 'fcc-docs/FAQ.md'
  },
  ...
-- everything work has expected  
```

now we stop server, and re-start the server, and we lost vector search :(, or gets empty array

```shell
# second start server, after first stop
$ surreal start --log info --allow-net --auth --user root --pass root --bind 0.0.0.0:8000 file://database
```

after we re-start the server we can verify that the index exists in db with:

```sql
info for table embedding_search;
{
  events: {},
  fields: {
    embedding: 'DEFINE FIELD embedding ON embedding_search TYPE array<float> ASSERT array::len($value) = 1024 PERMISSIONS FULL',
    "embedding[*]": 'DEFINE FIELD embedding[*] ON embedding_search TYPE float PERMISSIONS FULL'
  },
  indexes: {
    index_hnsw_embedding_search_embedding: 'DEFINE INDEX index_hnsw_embedding_search_embedding ON embedding_search FIELDS embedding HNSW DIMENSION 1024 DIST EUCLIDEAN TYPE F64 EFC 150 M 12 M0 24 LM 0.40242960438184466f'
  },
  lives: {},
  tables: {}
}

-- test semantic search (*2)
let $tb = 'embedding_search';
let $ollama_embeddings_endpoint = "http://192.168.1.84:11434/api/embeddings";
let $payload_search = { "model": "mxbai-embed-large", "prompt": "Represent this sentence for searching relevant passages: What is the best way to help with freeCodeCamp.org?" };
-- get embedding search
let $embedding_search = http::post($ollama_embeddings_endpoint, $payload_search).embedding;
-- return $embedding_search;
select title, chunkText, vector::distance::euclidean($embedding_search, embedding) as distance from type::table($tb) where embedding <|20,150|> $embedding_search;
-- outcome
-------- Query 5 (350.129µs) --------

[]
```

as we see now we have a empty array, if we use the create index again (`define index index_hnsw_embedding_search_embedding on embedding_search fields embedding hnsw dimension 1024 dist euclidean efc 150 m 12;`) it starts working again

NOTE: another problem of re-create the index is the server can crash when we re-create the index again like I expose in discord at https://discord.com/channels/902568124350599239/1018618253695795261/1244697892
