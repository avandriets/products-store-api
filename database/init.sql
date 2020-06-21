DROP TABLE if exists store.public.Products;

CREATE TABLE store.public.Products
(
    id TEXT PRIMARY KEY,
    title TEXT,
    description	TEXT,
    created_at timestamp  NOT NULL  DEFAULT current_timestamp,
    updated_at timestamp  NOT NULL  DEFAULT current_timestamp
);
