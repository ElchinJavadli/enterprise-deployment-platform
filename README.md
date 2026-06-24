# Welcome to 06 Deployment
***

## Task
The task is to deploy an enterprise platform using modern deployment tools.
The challenge is to create a production-ready application with CI/CD, environment variables, Prisma database support, monitoring, and automatic deployments.

## Description
This project is a full-stack gaming platform built with Next.js and TypeScript.
I used Prisma to connect the application to the database. I configured the project for production and deployed it with Vercel.
Main technologies:
Next.js
TypeScript
Prisma
GitHub
GitHub Actions
Vercel
Vercel Analytics
Vercel Speed Insights
The project automatically builds and deploys when code is pushed to GitHub.


## Installation
Clone the repository:
git clone https://github.com/ElchinJavadli/enterprise-deployment-platform.git
cd enterprise-deployment-platform
Install dependencies:
npm install

Then create a .env file
Run Prisma generate:
npx prisma generate
Start the project:
npm run dev



## Usage
After starting the project, open your browser and go to:
http://localhost:3000

Build the project for production:
npm run build
npm start

## CI/CD Pipeline
GitHub Actions performs:
Install dependencies
Prisma generate
Type checking
Lint checking
Security audit
Production build
The project uses branch protection and pull requests.
Vercel automatically creates:
Preview deployments for pull requests
Production deployments after merging to the main branch


## Monitoring
The project uses:
Vercel Analytics for visitor and usage monitoring.
Vercel Speed Insights for performance monitoring.
These tools help track the production application.


## Deployment

The project is deployed on Vercel:
https://enterprise-deployment-platform-tan.vercel.app/

### The Core Team
@javadli_e

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>