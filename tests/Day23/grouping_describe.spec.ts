import { test, expect } from '@playwright/test';

test.describe('Group1', async() => {
    test('Test1', async () => {
      console.log('Test1')
    });

    test('Test2', async () => {
        console.log('Test2')
    });
});

// Nested Describe

test.describe('E-Commerce', () => {
    test.describe('Group2', () => {
        test('Test3', async()=>{
            console.log('Test3')
        })
    });
    test.describe('Group3', () => {
        test('Test4',async()=>{
            console.log('Test4')
        })

    });
})