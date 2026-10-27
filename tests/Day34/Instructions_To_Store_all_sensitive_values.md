# Instructions To Store all sensitive values

Store all sensitive values in a `.env` file and access them using `process.env`. Never commit the `.env` file to GitHub.

## 1. Install dotenv

```bash
npm install dotenv
```

## 2. Create a `.env` file

```dotenv
# ==================================================
# API Authentication Credentials
# ==================================================

# OpenWeatherMap API Key
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY

# TheCatAPI Key
CAT_API_KEY=YOUR_CAT_API_KEY

# GitHub Personal Access Token
GITHUB_TOKEN=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN

# Basic Authentication Credentials
BASIC_AUTH_USERNAME=postman
BASIC_AUTH_PASSWORD=password
```

## 3. Load `.env`

At the top of your test file:

```ts
import dotenv from 'dotenv'; // Import the dotenv package to load environment variables from a .env file
dotenv.config(); // Load environment variables from the .env file
```

## 5. Recommended `.gitignore`

Never commit your `.env` file.

```gitignore
# Environment variables
.env
.env.*

# Ignore Playwright reports
playwright-report/
test-results/

# Ignore Node modules
node_modules/
```

## 6. Project Structure

```text
Playwright_API_Project
|
|-- .env
|-- .gitignore
|-- package.json
|-- playwright.config.ts
|
|-- tests
|   `-- api_authentication.spec.ts
|
`-- node_modules
```

## Benefits of using `.env`

- Keeps API keys and tokens secure.
- Prevents sensitive credentials from being pushed to GitHub.
- Makes it easy to switch between development, staging, and production environments.
- Follows industry best practices for Playwright, Node.js, and API automation projects.
- Makes your tests reusable across different machines without modifying the test code.
