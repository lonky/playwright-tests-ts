import { test, expect } from "../fixtures/myFixture";


test('Token is available', async ({ authToken }) => {
    expect(authToken).toBe('abc123');
});

test('Logged page', async ({ loggedPage }) => {
    await loggedPage.goto('https://the-internet.herokuapp.com/secure');

    await expect(loggedPage.getByRole('heading', { name: "Secure Area", exact: true})).toBeVisible();
    await expect(loggedPage.getByText('Welcome to the Secure Area. When you are done click logout below.')).toBeVisible();
});
