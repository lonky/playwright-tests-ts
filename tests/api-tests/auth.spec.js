import { expect, test } from "@playwright/test";

test('Mock list of fruits', async ({ request }) => {
    const token = 'abc123';
    const response = await request.get('https://httpbin.org/anything',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    await expect(response.status()).toBe(200);
    const data = await response.json();
    await expect(data.headers.Authorization).toBe(`Bearer ${token}`);
});