/*
Prerequisites
Install the require package
  npm i ajv

AJV is used for schema validation
AJV stand for Another JSON schema validation

ajv.compile(schema) return a validaor function
validate(data) checks if the response matches with schema

*/

import { test, expect } from '@playwright/test';
import AJV from 'ajv'

test('Schema validation', async ({ request }) => {

    //Step 1: Send the request and get response
    const response = await request.get('https://mocktarget.apigee.net/json')
    const responseBody = await response.json();

    console.log(responseBody)

    // Step 2: Define the schema
    const schema = {
        "type": "object",
        "properties": {
            "firstName": {"type": "string"},
            "lastName": {"type": "string"},
            "city": {"type": "string"},
            "state": {"type": "string"}
        },
        "required": ["firstName","lastName","city","state"]
    }

    // Step 3: Check response against schema
    const ajv = new AJV();
    const validate = ajv.compile(schema); // return a validator function
    const isValid = validate(responseBody);
    expect(isValid).toBeTruthy();
})

// Example 2
test('Validate json response with schema2', async ({ request }) => {

    //Step 1: Send the request and get response
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')
    const responseBody = await response.json();

    console.log(responseBody)

    // Step 2: Define the schema
    const schema = {
        "type": "object",
        "properties": {
            "userId": {"type": "number"},
            "id": {"type": "number"},
            "title": {"type": "string"},
            "body": {"type": "string"}
        },
        "required": ["userId", "id", "title", "body"]
    }

    // Step 3: Check response against schema
    const ajv = new AJV();
    const validate = ajv.compile(schema); // return a validator function
    const isValid = validate(responseBody);
    expect(isValid).toBeTruthy();
})