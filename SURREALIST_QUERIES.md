# SURREALIST_QUERIES

## gutenberg hnsw embedding search

```sql
-- scheme and indexs
define index index_hnsw_embedding_search_embedding on embedding_search fields embedding hnsw dimension 1024 dist euclidean efc 150 m 12;
-- define field if not exists embedding on table embedding_search type array<float> assert array::len($value) = 1024;
info for table embedding_search;

-- count import data embeddings
select title, count() as count from embedding_search 
-- where string::startsWith(title,'fcc-docs')
-- where title = 'To the Person Sitting in Darkness by Mark Twain'
group by title order by count desc;

let $title = 'To the Person Sitting in Darkness by Mark Twain';
-- let $title = 'Romeo and Juliet by William Shakespeare';
-- let $title = 'The Blue Castle - a novel by L. M. Montgomery';
-- let $title = 'Romeo and Juliet by William Shakespeare';
-- let $title = 'The Complete Works of William Shakespeare by William Shakespeare';
-- let $title = 'Moby Dick - Or, The Whale by Herman Melville';
-- let $title = 'A Room with a View by E. M. Forster';
-- let $title = 'C3-KB';
-- let $title = 'C3-Manual';
-- let $title = 'fcc-docs/devops.md';
-- delete from embedding_search where title = $title;

-- THIS WILL DELETE WHOLE TABLE RECORDS WTF
-- delete from embedding_search where 'To the Person Sitting in Darkness by Mark Twain';
-- delete from embedding_search where 'forget field = ';

-- select title, count() as count from embedding_search where title = $title group by title order by count desc;
-- select * from embedding_search where title = $title limit 1;
select title, chunkIndex, chunkText
-- , embedding 
from embedding_search where title = $title order by title, chunkIndex;

-- test semantic search
let $tb = 'embedding_search';
-- select count() as count from type::table($tb) group all;
let $ollama_embeddings_endpoint = "http://192.168.1.84:11434/api/embeddings";
-- let $ollama_embeddings_endpoint = "http://127.0.0.1:11434/api/embeddings";
let $payload_search = { "model": "mxbai-embed-large", "prompt": "Represent this sentence for searching relevant passages: What is the best way to help with freeCodeCamp.org?" };
-- get embedding search
let $embedding_search = http::post($ollama_embeddings_endpoint, $payload_search).embedding;
-- return $embedding_search;
select title, chunkText, vector::distance::euclidean($embedding_search, embedding) as distance from type::table($tb) where embedding <|20,150|> $embedding_search;
```
