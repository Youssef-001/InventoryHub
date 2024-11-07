# InventoryHub

InventoryHub is a Node.js-based application for managing your video game collection. It allows users to track and manage their games, including details such as title, platform, release year, and more. Using PostgreSQL as the database, the app provides a simple and efficient way to catalog your games.

## Features
- **Game Management**: Add, update, or remove games in your collection.
- **Game Details**: Store information like title, platform, release year, genre, and status.
- **PostgreSQL Database**: Efficient relational database management for storing game data.
- **Dynamic UI**: Rendered using EJS for dynamic, interactive pages.

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: EJS templating engine

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Youssef-001/InventoryHub.git```
2. Install dependencies: ```bash npm install```
3. Set up PostgreSQL and configure the database connection in config/db.js.
4. Run the application: ```bash npm node app.js``` // listens on localhost:3000
