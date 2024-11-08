#! /usr/bin/env node
const { Client } = require("pg");
const axios = require("axios");

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
('The Legend of Zelda: Breath of the Wild', 1, 'Explore the kingdom of Hyrule in this expansive open-world adventure, where you will solve puzzles, battle monsters, and uncover the mysteries of the past as Link.', 2, ''),
('Red Dead Redemption 2', 2, 'Immerse yourself in the Wild West with Arthur Morgan and the Van der Linde gang as they navigate the challenges of outlaw life and the encroaching modern world.', 2, ''),
('Cyberpunk 2077', 3, 'Step into the shoes of V, a mercenary in the dystopian Night City, where you can explore a richly detailed world, engage in high-stakes missions, and forge your own destiny.', 1, ''),
('The Sims 4', 4, 'Create unique characters and build their homes while managing their lives, relationships, and ambitions in this engaging life simulation game.', 4, ''),
('Civilization VI', 5, 'Lead your civilization from the Stone Age to the Information Age, making strategic decisions about politics, warfare, and culture to dominate the globe.', 5, ''),
('FIFA 22', 2, 'Experience the thrill of football with realistic gameplay, updated teams, and leagues, where you can build your dream team and compete on a global stage.', 6, ''),
('Minecraft', 1, 'In this sandbox game, players can build anything they can imagine, explore randomly generated worlds, and survive against monsters, fostering creativity and adventure.', 4, ''),
('Assassin’s Creed Valhalla', 3, 'Join Eivor, a Viking raider, as you explore a dynamic open world, engage in brutal combat, and shape the destiny of your clan in the age of the Norse.', 1, ''),
('Final Fantasy XV', 3, 'Follow Noctis and his friends on a grand road trip across the kingdom of Lucis, battling foes and unraveling an epic story filled with friendship and sacrifice.', 3, ''),
('SimCity', 4, 'Design and manage your own city while facing the challenges of urban planning, from natural disasters to traffic congestion, and build a thriving metropolis.', 4, ''),
('Hollow Knight', 1, 'Delve into the dark, immersive world of Hallownest as a small knight, uncovering the rich lore and engaging in challenging combat against a variety of foes.', 2, ''),
('God of War', 3, 'Embark on a journey through Norse mythology with Kratos and his son Atreus, battling gods and monsters while exploring the depths of their relationship.', 1, ''),
('Dark Souls III', 2, 'Enter a dark fantasy world filled with challenging enemies and intricate lore, where every victory feels hard-earned and every failure teaches a lesson.', 3, ''),
('Overwatch', 5, 'Join the battle in this team-based multiplayer shooter, selecting from a diverse cast of heroes, each with unique abilities and roles to play in fast-paced matches.', 1, ''),
('Animal Crossing: New Horizons', 4, 'Create your own island paradise, customize your home, interact with charming animal villagers, and participate in seasonal events in this relaxing life simulation.', 6, ''),
('Halo Infinite', 1, 'Take control of the legendary Master Chief and battle against the Banished on the Zeta Halo ring in this thrilling sci-fi shooter.', 1, ''),
('Resident Evil Village', 2, 'Survive terrifying encounters in a remote European village as Ethan Winters searches for his kidnapped daughter in this horror game.', 2, ''),
('Hades', 3, 'Escape the Underworld as Zagreus, the son of Hades, in this fast-paced rogue-like dungeon crawler with a compelling story.', 1, ''),
('Genshin Impact', 4, 'Explore the open world of Teyvat, use elemental magic, and assemble a team of characters in this gacha-based action RPG.', 3, ''),
('Among Us', 5, 'Work together or deceive your friends as you complete tasks or sabotage the spaceship in this social deduction game.', 4, ''),
('Fortnite', 1, 'Join the battle royale phenomenon where players build, loot, and fight to be the last one standing on the island.', 1, ''),
('League of Legends', 2, 'Compete in fast-paced MOBA matches, selecting from a vast roster of champions to strategize and outplay the opposing team.', 5, ''),
('Apex Legends', 3, 'Play as one of many unique Legends in this battle royale shooter set in the Titanfall universe, teaming up to be the last squad standing.', 1, ''),
('Elden Ring', 2, 'Explore a vast fantasy world filled with dangers and secrets in this action RPG co-created by FromSoftware and George R.R. Martin.', 3, ''),
('The Witcher 3: Wild Hunt', 4, 'Step into the role of Geralt of Rivia as he explores a richly detailed open world, battling monsters and shaping his own destiny.', 2, ''),
('Call of Duty: Modern Warfare', 5, 'Experience the intense battles and realistic graphics of this popular first-person shooter, set in a modern-day war scenario.', 1, ''),
('Super Mario Odyssey', 1, 'Join Mario on a globe-trotting adventure to rescue Princess Peach from Bowser’s wedding plans.', 2, ''),
('Doom Eternal', 2, 'Battle through hordes of demons in this fast-paced first-person shooter that emphasizes fluid movement and visceral combat.', 1, ''),
('Persona 5', 3, 'Enter the mind-bending world of Persona, where players balance high school life with battling dark forces as part of the Phantom Thieves.', 3, ''),
('The Elder Scrolls V: Skyrim', 4, 'Explore the vast, open-world fantasy realm of Tamriel, battling dragons, casting spells, and forging your own path.', 2, ''),
('Battlefield 2042', 5, 'Enter a futuristic war zone, with massive maps, realistic weather events, and fast-paced team-based combat.', 1, ''),
('Ghost of Tsushima', 1, 'Become a samurai on Tsushima Island and fight to repel the Mongol invasion in this open-world action-adventure.', 2, ''),
('Far Cry 6', 2, 'Take on the role of a guerrilla fighter and work to overthrow a dictator in the fictional country of Yara.', 1, ''),
('Dragon Age: Inquisition', 3, 'Lead a team of heroes to close a tear in the sky and bring peace to Thedas in this epic fantasy RPG.', 3, ''),
('Splatoon 3', 4, 'Engage in colorful ink-based battles with other players, covering territory and competing for the win.', 6, ''),
('Forza Horizon 5', 5, 'Drive through an open-world Mexico, competing in races and challenges, with stunning graphics and a variety of cars.', 6, ''),
('Borderlands 3', 1, 'Dive into this looter-shooter with quirky humor, fast-paced action, and unique character classes.', 1, ''),
('Destiny 2', 2, 'Become a Guardian and defend humanity from powerful foes across the solar system in this shared-world shooter.', 1, ''),
('Dead by Daylight', 3, 'In this horror multiplayer game, survive against a relentless killer or take on the role of the killer and hunt down survivors.', 1, ''),
('Nier: Automata', 4, 'Explore a post-apocalyptic Earth as androids fighting to reclaim the planet from hostile machines.', 3, '');
`;

async function fetchCoverImage(gameTitle) {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: "c440f23312eb4c88b83918b21875ecd7",
        page_size: 1,
        search: gameTitle,
      },
    });
    if (response.data.results.length > 0) {
      return response.data.results[0].background_image;
    } else {
      console.log(`No image found for ${gameTitle}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching cover for ${gameTitle}:`, error);
    return null;
  }
}

async function updateCoverImages(client) {
  try {
    const res = await client.query("SELECT * FROM games");
    for (const game of res.rows) {
      const coverImage = await fetchCoverImage(game.title);
      if (coverImage) {
        await client.query("UPDATE games SET cover = $1 WHERE id = $2", [
          coverImage,
          game.id,
        ]);
        console.log(`Updated cover image for game: ${game.title}`);
      }
    }
  } catch (err) {
    console.error("Error updating cover images:", err);
  }
}

async function main() {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "top_users",
    password: "root",
    port: 5432,
  });

  await client.connect();

  try {
    await client.query(SQL); // Create tables
    await client.query(seedData); // Seed data
    console.log("Database created and seeded successfully");

    // Now update cover images
    await updateCoverImages(client);
    console.log("All cover images updated successfully!");
  } catch (err) {
    console.error("Error in database operation:", err);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
