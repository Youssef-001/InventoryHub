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
('Bob Brown'),
('Chris Williams');

INSERT INTO games (title, author, description, genre, cover) VALUES
('The Legend of Zelda: Breath of the Wild', 1, 'Explore the kingdom of Hyrule in this expansive open-world adventure, where you will solve puzzles, battle monsters, and uncover the mysteries of the past as Link.', 2, 'https://example.com/zelda.jpg'),
('Red Dead Redemption 2', 2, 'Immerse yourself in the Wild West with Arthur Morgan and the Van der Linde gang as they navigate the challenges of outlaw life and the encroaching modern world.', 2, 'https://example.com/reddead.jpg'),
('Cyberpunk 2077', 3, 'Step into the shoes of V, a mercenary in the dystopian Night City, where you can explore a richly detailed world, engage in high-stakes missions, and forge your own destiny.', 1, 'https://example.com/cyberpunk.jpg'),
('The Sims 4', 4, 'Create unique characters and build their homes while managing their lives, relationships, and ambitions in this engaging life simulation game.', 4, 'https://example.com/sims.jpg'),
('Civilization VI', 5, 'Lead your civilization from the Stone Age to the Information Age, making strategic decisions about politics, warfare, and culture to dominate the globe.', 5, 'https://example.com/civ6.jpg'),
('FIFA 22', 2, 'Experience the thrill of football with realistic gameplay, updated teams, and leagues, where you can build your dream team and compete on a global stage.', 6, 'https://example.com/fifa22.jpg'),
('Minecraft', 1, 'In this sandbox game, players can build anything they can imagine, explore randomly generated worlds, and survive against monsters, fostering creativity and adventure.', 4, 'https://example.com/minecraft.jpg'),
('Assassin’s Creed Valhalla', 3, 'Join Eivor, a Viking raider, as you explore a dynamic open world, engage in brutal combat, and shape the destiny of your clan in the age of the Norse.', 1, 'https://example.com/valhalla.jpg'),
('Final Fantasy XV', 3, 'Follow Noctis and his friends on a grand road trip across the kingdom of Lucis, battling foes and unraveling an epic story filled with friendship and sacrifice.', 3, 'https://example.com/ffxv.jpg'),
('SimCity', 4, 'Design and manage your own city while facing the challenges of urban planning, from natural disasters to traffic congestion, and build a thriving metropolis.', 4, 'https://example.com/simcity.jpg'),
('Hollow Knight', 1, 'Delve into the dark, immersive world of Hallownest as a small knight, uncovering the rich lore and engaging in challenging combat against a variety of foes.', 2, 'https://example.com/hollowknight.jpg'),
('God of War', 3, 'Embark on a journey through Norse mythology with Kratos and his son Atreus, battling gods and monsters while exploring the depths of their relationship.', 1, 'https://example.com/godofwar.jpg'),
('Dark Souls III', 2, 'Enter a dark fantasy world filled with challenging enemies and intricate lore, where every victory feels hard-earned and every failure teaches a lesson.', 3, 'https://example.com/darksouls3.jpg'),
('Overwatch', 5, 'Join the battle in this team-based multiplayer shooter, selecting from a diverse cast of heroes, each with unique abilities and roles to play in fast-paced matches.', 1, 'https://example.com/overwatch.jpg'),
('Animal Crossing: New Horizons', 4, 'Create your own island paradise, customize your home, interact with charming animal villagers, and participate in seasonal events in this relaxing life simulation.', 6, 'https://example.com/animalcrossing.jpg');
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
