# Welcome to 06 Deployment
***

## Task
The task is to deploy enterprise platform using modern tools.  
The challenge is to make a working production deployment with CI/CD, environment variables, and database setup using Prisma and Netlify.
We must also ensure the application works correctly in production like real-world software systems.

## Description
In this project, I built and deployed a full-stack web application using Next.js and TypeScript.
I used Prisma to connect the application to a database.  
I also fixed version problems and configured Prisma to work correctly in production.
For deployment, I used:
- GitHub for source control
- GitHub Actions for CI (Continuous Integration)
- Netlify for deployment
This setup makes the project automatically build and deploy when I push code to GitHub.

## Installation
To run this project locally, follow these steps:

git clone https://github.com/ElchinJavadli/enterprise-deployment-platform.git
cd enterprise-deployment-platform
npm install

Then create a .env file

Run Prisma generate:
npx prisma generate

Start the project:
npm run dev





## Usage
After starting the project, open your browser and go to:
http://localhost:3000

The application will run in development mode.
To build the project for production:
npm run build
npm start
CI/CD Pipeline
When code is pushed to GitHub:
GitHub Actions runs tests and build
Netlify automatically deploys the project
This ensures the project is always updated and working in production.


### The Core Team
@javadli_e

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>