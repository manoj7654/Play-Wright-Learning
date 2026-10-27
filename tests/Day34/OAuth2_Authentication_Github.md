# OAuth2 Authentication with GitHub

## Architecture

``` text
GitHub OAuth App
       |
       | Client ID + Client Secret
       v
OAuth2 Authorization Flow
       |
       +-------------------------+
       |                         |
 GitHub Login             User Grants Access
       |                         |
       +------------+------------+
                    |
            Authorization Code
                    |
          Exchange Code for Token
                    |
           Access Token (Bearer)
                    |
           +--------+--------+
           |                 |
    Playwright API Tests  GitHub REST API
```

## What You Will Learn

-   Create a GitHub OAuth App.
-   Generate an OAuth 2.0 access token.
-   Use the token in Playwright.
-   Call GitHub REST APIs.
-   Validate API responses.
-   Perform CRUD operations.
-   Handle authentication failures.

## Step 1: Create a GitHub Account

Create a GitHub account if you do not already have one.

## Step 2: Create an OAuth App

In GitHub, navigate to **Settings → Developer Settings → OAuth Apps →
New OAuth App**.

Fill in:

-   **Application Name:** `Playwright OAuth Demo`
-   **Homepage URL:** `http://localhost:3000`
-   **Authorization callback URL:** `http://localhost:3000/callback`

Click **Register Application**. GitHub provides a **Client ID**.
Generate a **Client Secret** too, and keep both safe.

## Step 3: Understand the OAuth 2.0 Flow

1.  Playwright opens the browser.
2.  The user signs in to GitHub.
3.  The user grants permission.
4.  GitHub provides an authorization code.
5.  The application exchanges the code for an access token.
6.  The token is used to call GitHub REST APIs.

## Step 4: Request an Authorization Code

Authorization endpoint:

``` text
https://github.com/login/oauth/authorize
```

Parameters include `client_id`, `scope`, and `redirect_uri`.

Example:

``` text
https://github.com/login/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &scope=repo,user,delete_repo
  &redirect_uri=http://localhost:3000/callback
```

GitHub redirects to a URL such as:

``` text
http://localhost:3000/callback?code=123456
```

The `code` value is the authorization code.

**Important:** Authorization codes are single-use. Generate a new code
each time you test the authorization-code flow. Reusing a code may
return `bad_verification_code`.

## Step 5: Exchange the Authorization Code for an Access Token

Send a `POST` request to:

``` text
https://github.com/login/oauth/access_token
```

Include `client_id`, `client_secret`, and `code`, with this header:

``` http
Accept: application/json
```

Example response:

``` json
{
  "access_token": "gho_xxxxxxxxxxxxxxxxx",
  "token_type": "bearer",
  "scope": "repo,user"
}
```

## Step 6: Create a Playwright Project

``` bash
npm init playwright@latest
npm install
```

## Step 7: Create an Environment File

Create a `.env` file in the project root:

``` env
GITHUB_TOKEN=gho_xxxxxxxxxxxxxxxxxxx
```

Use your real token locally. Never commit `.env` or real credentials to
version control.

## Step 8: Load Environment Variables

Install `dotenv`:

``` bash
npm install dotenv
```

Load the environment variables:

``` typescript
import dotenv from 'dotenv';

dotenv.config();
```

## Step 9: Make Your First GitHub API Request

Endpoint: `GET /user`

``` typescript
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Get Logged In User', async ({ request }) => {
  const response = await request.get(
    'https://api.github.com/user',
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.login).toBeTruthy();
  expect(body.id).toBeGreaterThan(0);
  expect(body.name).not.toBeNull();
});
```

Example response fields (illustrative values):

``` json
{
  "login": "john",
  "id": 123456,
  "name": "John Smith",
  "followers": 20
}
```

## Step 10: Get Your Repositories

Endpoint: `GET /user/repos`

``` typescript
const response = await request.get(
  'https://api.github.com/user/repos',
  {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  }
);

expect(response.ok()).toBeTruthy();
```

## Step 11: Create a Repository

Endpoint: `POST /user/repos`

``` typescript
const response = await request.post(
  'https://api.github.com/user/repos',
  {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
    data: {
      name: 'PlaywrightDemoRepo',
      private: false
    }
  }
);

expect(response.status()).toBe(201);
```

## Step 12: Verify a Repository

Endpoint:

``` text
GET /repos/{username}/PlaywrightDemoRepo
```

Verify the response body:

``` typescript
expect(body.name).toBe('PlaywrightDemoRepo');
```

## Step 13: Delete a Repository

Endpoint: `DELETE /repos/{owner}/{repo}`

Expected status: `204 No Content`. Only delete repositories created for
your test and intended for cleanup.

## Step 14: API Chaining

A common API test workflow:

1.  Create a repository.
2.  Get the repository.
3.  Update the repository.
4.  Delete the repository.

## Step 15: Negative Testing

  Scenario                            Expected Status
  ---------------------- ----------------------------
  Invalid token                    `401 Unauthorized`
  Missing token                    `401 Unauthorized`
  Invalid repository                  `404 Not Found`
  Duplicate repository     `422 Unprocessable Entity`

Actual statuses can depend on the endpoint, permissions, and request
details.

## Common GitHub REST APIs

  API                  Method
  -------------------- ----------
  Get User             `GET`
  Get Repositories     `GET`
  Create Repository    `POST`
  Update Repository    `PATCH`
  Delete Repository    `DELETE`
  List Branches        `GET`
  Create Issue         `POST`
  Close Issue          `PATCH`
  List Pull Requests   `GET`
  Get Commits          `GET`

## Recommended Project Structure

``` text
GitHubAPIProject/
├── tests/
│   └── github.spec.ts
├── utils/
│   └── auth.ts
├── playwright.config.ts
├── .env
└── package.json
```

## Best Practices

-   Never hardcode an access token in source code.
-   Store secrets in `.env` and exclude the file from version control.
-   Reuse authentication headers through a helper or fixture.
-   Validate HTTP status codes and response payloads.
-   Clean up test data, such as repositories, after each test.
-   Use unique repository names (for example, append a timestamp) to
    avoid duplicate-name errors (`422`).
