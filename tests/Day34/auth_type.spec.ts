import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

//Reading data form .env file
dotenv.config()

test.describe('API Authentication Example', () => {

    test('1. No Authentication', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/todos/1')

        //Verify status code
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        console.log(responseBody)

        expect(responseBody).toHaveProperty('userId')
        expect(responseBody).toHaveProperty('id')
        expect(responseBody).toHaveProperty('title')
    })

    //https://postman-echo.com/basic-auth
    test('2. Basic Authentication', async ({ request }) => {
        const username = process.env.BASIC_AUTH_USERNAME;
        const password = process.env.BASIC_AUTH_PASSWORD

        const base64caredentials = Buffer.from(`${username}:${password}`).toString('base64');
        console.log(base64caredentials)

        const response = await request.get('https://postman-echo.com/basic-auth', {
            headers: {
                Authorization: `Basic ${base64caredentials}`
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.authenticated).toBe(true)
    })

    // API Key Authentication
    //Not you'll need to sing up for a free API key at https://api.openweathermap.org/api
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    test('3. API Key Authentication (Open Weather App)', async ({ request }) => {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const city = 'Delhi'
        const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: `${city}`,
                appid: apiKey!
            }
        })
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody)
        expect(responseBody.name).toBe(city)
        expect(responseBody).toHaveProperty('main')
    })

    // Beare Token (JWT)
    // Git hub api url : https://api.github.com/user/repos
    test('4. Beare token authentication - Get user Repositories', async ({ request }) => {
        const token = process.env.GITHUB_TOKEN

        const response = await request.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        expect(response.status()).toBe(200);
        const repositries=await response.json();

        //Getting repositories name
        for(let repo of repositries){
            console.log(repo.full_name)
        }
       // Getting repo count
        console.log(repositries.length)

    })

})