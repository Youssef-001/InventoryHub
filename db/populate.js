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
('Animal Crossing: New Horizons', 4, 'Create your own island paradise, customize your home, interact with charming animal villagers, and participate in seasonal events in this relaxing life simulation.', 6, 'https://example.com/animalcrossing.jpg'),
('Halo Infinite', 1, 'Take control of the legendary Master Chief and battle against the Banished on the Zeta Halo ring in this thrilling sci-fi shooter.', 1, 'https://example.com/halo.jpg'),
('Resident Evil Village', 2, 'Survive terrifying encounters in a remote European village as Ethan Winters searches for his kidnapped daughter in this horror game.', 2, 'https://example.com/residentevil.jpg'),
('Hades', 3, 'Escape the Underworld as Zagreus, the son of Hades, in this fast-paced rogue-like dungeon crawler with a compelling story.', 1, 'https://example.com/hades.jpg'),
('Genshin Impact', 4, 'Explore the open world of Teyvat, use elemental magic, and assemble a team of characters in this gacha-based action RPG.', 3, 'https://example.com/genshin.jpg'),
('Among Us', 5, 'Work together or deceive your friends as you complete tasks or sabotage the spaceship in this social deduction game.', 4, 'https://example.com/amongus.jpg'),
('Fortnite', 1, 'Join the battle royale phenomenon where players build, loot, and fight to be the last one standing on the island.', 1, 'https://example.com/fortnite.jpg'),
('League of Legends', 2, 'Compete in fast-paced MOBA matches, selecting from a vast roster of champions to strategize and outplay the opposing team.', 5, 'https://example.com/leagueoflegends.jpg'),
('Apex Legends', 3, 'Play as one of many unique Legends in this battle royale shooter set in the Titanfall universe, teaming up to be the last squad standing.', 1, 'https://example.com/apexlegends.jpg'),
('Elden Ring', 2, 'Explore a vast fantasy world filled with dangers and secrets in this action RPG co-created by FromSoftware and George R.R. Martin.', 3, 'https://example.com/eldenring.jpg'),
('The Witcher 3: Wild Hunt', 4, 'Step into the role of Geralt of Rivia as he explores a richly detailed open world, battling monsters and shaping his own destiny.', 2, 'https://example.com/witcher3.jpg'),
('Call of Duty: Modern Warfare', 5, 'Experience the intense battles and realistic graphics of this popular first-person shooter, set in a modern-day war scenario.', 1, 'https://example.com/codmw.jpg'),
('Super Mario Odyssey', 1, 'Join Mario on a globe-trotting adventure to rescue Princess Peach from Bowser’s wedding plans.', 2, 'https://example.com/marioodyssey.jpg'),
('Doom Eternal', 2, 'Battle through hordes of demons in this fast-paced first-person shooter that emphasizes fluid movement and visceral combat.', 1, 'https://example.com/doometernal.jpg'),
('Persona 5', 3, 'Enter the mind-bending world of Persona, where players balance high school life with battling dark forces as part of the Phantom Thieves.', 3, 'https://example.com/persona5.jpg'),
('The Elder Scrolls V: Skyrim', 4, 'Explore the vast, open-world fantasy realm of Tamriel, battling dragons, casting spells, and forging your own path.', 2, 'https://example.com/skyrim.jpg'),
('Battlefield 2042', 5, 'Enter a futuristic war zone, with massive maps, realistic weather events, and fast-paced team-based combat.', 1, 'https://example.com/battlefield.jpg'),
('Ghost of Tsushima', 1, 'Become a samurai on Tsushima Island and fight to repel the Mongol invasion in this open-world action-adventure.', 2, 'https://example.com/ghostoftsushima.jpg'),
('Far Cry 6', 2, 'Take on the role of a guerrilla fighter and work to overthrow a dictator in the fictional country of Yara.', 1, 'https://example.com/farcry6.jpg'),
('Dragon Age: Inquisition', 3, 'Lead a team of heroes to close a tear in the sky and bring peace to Thedas in this epic fantasy RPG.', 3, 'https://example.com/dragonage.jpg'),
('Splatoon 3', 4, 'Engage in colorful ink-based battles with other players, covering territory and competing for the win.', 6, 'https://example.com/splatoon3.jpg'),
('Forza Horizon 5', 5, 'Drive through an open-world Mexico, competing in races and challenges, with stunning graphics and a variety of cars.', 6, 'https://example.com/forza5.jpg'),
('Borderlands 3', 1, 'Dive into this looter-shooter with quirky humor, fast-paced action, and unique character classes.', 1, 'https://example.com/borderlands3.jpg'),
('Destiny 2', 2, 'Become a Guardian and defend humanity from powerful foes across the solar system in this shared-world shooter.', 1, 'https://example.com/destiny2.jpg'),
('Dead by Daylight', 3, 'In this horror multiplayer game, survive against a relentless killer or take on the role of the killer and hunt down survivors.', 1, 'https://example.com/deadbydaylight.jpg'),
('Nier: Automata', 4, 'Explore a post-apocalyptic Earth as androids fighting to reclaim the planet from hostile machines.', 3, 'https://example.com/nierautomata.jpg');
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
