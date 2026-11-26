import { expect, test } from "@playwright/test";

test('Mock list of fruits', async ({ page }) => {
    await page.route('https://demo.playwright.dev/api-mocking/api/v1/fruits', async(route) => {
        const fruits = [
            {
                name: "Cucumber",
                id: 1
            },
            {
                name: "Manana",
                id: 2
            },
            {
                name: "Potato",
                id: 3
            }
        ]

        await route.fulfill({
            status: 200,
            contentType: 'Application/json',
            json: fruits
        })
    })

    await page.goto('https://demo.playwright.dev/api-mocking/');
    await expect(page.getByText("Cucumber")).toBeVisible();
    await expect(page.getByText("Manana")).toBeVisible();
    await expect(page.getByText("Potato")).toBeVisible();
});

test('500 mock', async ({ page }) => {
        await page.route('https://demo.playwright.dev/api-mocking/api/v1/fruits', async(route) => {
            await route.fulfill({
                status: 500,
                contentType: 'Application/json',
                json: {
                    message: "Internal server error"
            }
        })
    })

    const responsePromise = page.waitForResponse('**/api/v1/fruits');
    await page.goto('https://demo.playwright.dev/api-mocking/');
    const response = await responsePromise;
    expect(response.status()).toBe(500);
    const data = await response.json();
    expect(data.message).toBe("Internal server error");
});
