# Platform Insights

## Project Overview

This project is a gaming platform where users can create an account, log in, view games, add games to their library, and see their achievements.
The platform also has a leaderboard that shows the best players based on their scores.
An admin user can add new games to the platform.


## What I learned

From this project I learned:
How to use Prisma with SQLite
How to create API routes
How JWT authentication works
How to protect pages with middleware
How to work with database relationships
How frontend and backend communicate
How to create role-based access control
This project helped me learn how frontend and backend work together.
It also helped me understand how data is stored in a database and how users can interact with that data.

## Database Design
The database contains four main tables:
-User
The User table stores:
Username
Email
Password
Role
Creation date
Each user can have many games and achievements.
-Game
The Game table stores:
Game title
Genre
Description
Image URL
This information is shown on the platform.

-UserGame
The UserGame table connects users and games.
It stores:
User ID
Game ID
Hours played
Score
This table allows users to build their own game library.

-Achievement
The Achievement table stores achievements earned by users.
Each achievement belongs to one user.

-Authentication System
The authentication system allows users to:
Register
Log in
Log out
Passwords are hashed before they are stored in the database.
This improves security because real passwords are never saved directly.
Protected pages can only be accessed by authenticated users.

-Admin Features
The platform has two roles:
Player
Players can:
View games
Add games to their library
View achievements
View leaderboard information

Admin
Admins can do everything a player can do.
They can also:
Add new games
Manage game information
This role-based system protects important actions.


## Conclusion
This project helped me understand backend development.
I learned how to create a complete full-stack application with authentication, database management, API routes, and user roles.
The project gave me practical experience with technologies that are commonly used in modern web development.