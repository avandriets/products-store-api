DROP TABLE if exists store.public.Products;
DROP TABLE if exists store.public.Categories;

CREATE TABLE store.public.Categories
(
    id TEXT PRIMARY KEY,
    name TEXT,
    description	TEXT,
    created_at timestamp  NOT NULL  DEFAULT current_timestamp,
    updated_at timestamp  NOT NULL  DEFAULT current_timestamp
);


CREATE TABLE store.public.Products
(
    id TEXT PRIMARY KEY,
    title TEXT,
    description	TEXT,
    category_id TEXT,
    created_at timestamp  NOT NULL  DEFAULT current_timestamp,
    updated_at timestamp  NOT NULL  DEFAULT current_timestamp,
    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
            REFERENCES Categories(id)
            ON DELETE SET NULL
);
