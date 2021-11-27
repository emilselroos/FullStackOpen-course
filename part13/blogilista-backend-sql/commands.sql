
CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	author TEXT,
	url TEXT NOT NULL,
	title TEXT NOT NULL,
	likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('Emil Selroos', 'https://', 'Eeppinen blogikirjoitus 1');
INSERT INTO blogs (author, url, title) values ('Matti Luukkainen', 'https://', 'Eeppinen blogikirjoitus 2');