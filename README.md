# InventoryHub

InventoryHub is a Node.js-based application for managing your video game collection. It allows users to track and manage their games, including details such as title, description, genre, cover. Using PostgreSQL as the database, the app provides a simple and efficient way to catalog your games.

## Features
- **Game Management**: Add, update, edit or remove games in your collection.
- **Game Details**: Store information like title, description, genre, author, cover.
- **PostgreSQL Database**: Efficient relational database management for storing game data with schema of 3 tables, games,genres,authors
- **Author Management**: View games by author, add new authors, and automatically delete authors if they no longer have games.
- **Filtering by Genre**: Filter games by genre using server-side queries.
- **Search**: Full-text search through the database to find specific games.
- **Data Validation**: Express Validator ensures proper data input for game forms.
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
