#! /usr/bin/env node
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS authors CASCADE;

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    author INTEGER,
    description TEXT,
    genre INTEGER,
    cover TEXT
);

CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT
);

CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT
);
`;

const seedData = `
INSERT INTO genres (title) VALUES
('Action'),
('Adventure'),
('Role-Playing Game'),
('Simulation'),
('Strategy'),
('Sports');

INSERT INTO authors (name) VALUES
('John Doe'),
('Jane Smith'),
('Alice Johnson'),
('Bob Brown');

INSERT INTO games (title, author, description, genre, cover) VALUES
('Epic Adventure', 1, 'An epic quest through the mountains.', 2, 'https://example.com/cover1.jpg'),
('Space Fighters', 1, 'Battle through the galaxy in this action-packed game.', 1, 'https://example.com/cover2.jpg'),
('Fantasy World', 3, 'A magical RPG with immersive storylines.', 3, 'https://example.com/cover3.jpg'),
('City Builder', 4, 'Create and manage your own city.', 4, 'https://example.com/cover4.jpg'),
('Football Frenzy', 2, 'Experience the excitement of football.', 6, 'https://example.com/cover5.jpg');
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:root@localhost:5432/top_users",
  });

  try {
    await client.connect();
    // Create tables
    await client.query(SQL);
    // Insert sample data
    await client.query(seedData);
    console.log("Data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.end();
    console.log("Done");
  }
}

main();
