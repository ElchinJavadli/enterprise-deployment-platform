# Welcome to 05 Backend Integration
***

## Task
The goal of this project is to build a gaming platform with backend features.
The challenge is to connect the frontend and backend together. Users must be able to register, log in, view games, add games to their library, and see achievements and leaderboard data.


## Description
I solved this problem by using Next.js, Prisma, SQLite, and JWT authentication.
The application has:
User registration and login
Protected dashboard page
Game library system
Achievement system
Leaderboard system
Admin role for adding new games
The backend stores data in a SQLite database using Prisma ORM. JWT tokens and cookies are used for user authentication.

## Installation

Clone the project and install dependencies:
npm install
Generate Prisma client:
npx prisma generate
Create the database:
npx prisma migrate dev --name init
Add sample data:
npx prisma db seed
Start the development server:
npm run dev


## Usage
Open the application in your browser:
http://localhost:3000

Test accounts:
Admin:
admin@gaming.com
password123

Player:
player@gaming.com
password123

Features:
Register a new account
Login to the platform
Browse available games
Add games to your library
View achievements
Check the leaderboard
Add new games as an admin

### The Core Team
@javadli_e

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>