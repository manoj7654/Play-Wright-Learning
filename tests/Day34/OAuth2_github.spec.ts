/*

=========================================================================
Github OAuth2 Authenticaton + API Chaining
=========================================================================

Pre-Requisites:
---------------

Step 1: Manually create an OAuth App in the Github

Step 2: Manually get the client ID and Client Secret from the OAuth App
Store in the .env file

Step 3: Generate the Authorization code manually by opening the authorization URL in the browser.
Store the authorization code in the .env file
               
Step 4: Exchange the Authorization code for an access token.
https://github.com/login/oauth/access_token?client_id=YOUR CLIENT ID&client_secret= YOUR SECRET ID&code=YOUR CODE 
(This is done automatically in the first test.)

Step 5: Reuse the same Access Token in all remaining test.

=====================================================================
Flow

Generate Access Token

Create Repository

Get Repository

Update Repository

Verify update

Delete Repository

Verify Deletion

*/

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const GITBUB_CONFIG = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    auth_code: process.env.GITHUB_AUTHORIZATION_CODE!,
    token_url: process.env.GITHUB_TOKEN_URL!,
    base_url: process.env.GITHUB_BASE_URL!,
    user_name: process.env.GITHUB_USERNAME!
}

let token = '';
let repoName = '';
test.describe.serial('OAUTH DEMO', () => {

    test('Generate OAuth2 Access token', async ({ request }) => {
        const response = await request.post(GITBUB_CONFIG.token_url, {
            headers: {
                Accept: 'application/json'
            },
            form: {
                client_id: GITBUB_CONFIG.client_id,
                client_secret: GITBUB_CONFIG.client_secret,
                code: GITBUB_CONFIG.auth_code
            }
        })
        expect(response.status()).toBe(200);
        const responeBpdy = await response.json();
        token = responeBpdy.access_token;
        expect(token).toBeTruthy()
        console.log('Token created Successfully')
    })

    test('Create Repository', async ({ request }) => {
        repoName = `Play-wright-repo${Date.now()}`
        const response = await request.post(`${GITBUB_CONFIG.base_url}/user/repos`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json'
            },
            data: {
                name: repoName,
                description: 'Repository creaed using playwright',
                private: false
            }
        })
        
        expect(response.status()).toBe(201);
        const responeBpdy = await response.json();
        console.log(responeBpdy);
        expect(responeBpdy.name).toBe(repoName);
        console.log('Repository has been created successfully')
    
    })

    test('Get Repository', async ({ request }) => {
        const response = await request.get(`${GITBUB_CONFIG.base_url}/repos/${GITBUB_CONFIG.user_name}/${repoName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json'
            }
        })
        
        expect(response.status()).toBe(200);
        const responeBpdy = await response.json();
        console.log(responeBpdy.name);
        expect(responeBpdy.name).toBe(repoName);
    
    })

     test('Update Repository', async ({ request }) => {
        const response = await request.patch(`${GITBUB_CONFIG.base_url}/repos/${GITBUB_CONFIG.user_name}/${repoName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json'
            },
            data:{
                description:"Repository update using playwright API",
                homepage:'https://playwright.dev',
                has_issues:true
            }
        })
        
        expect(response.status()).toBe(200);
        const responeBpdy = await response.json();
        console.log('Description has been updated successfully')
    })

    
test('Delete Repository', async ({ request }) => {
    const response = await request.delete(
        `${GITBUB_CONFIG.base_url}/repos/${GITBUB_CONFIG.user_name}/${repoName}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }
    );

    console.log('Status Code:', response.status());
    console.log('Response Body:', await response.text());
    console.log(
        'Rate Limit Remaining:',
        response.headers()['x-ratelimit-remaining']
    );

    expect(response.status()).toBe(204);

    console.log('Repository deleted successfully');
});

    
})