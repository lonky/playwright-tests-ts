import { expect, test } from "@playwright/test";

test('GET posts/1 by id', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post.id).toBe(1);
    expect(post.userId).toBe(1);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
});

test('Create new post', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts',
        {
            data: {
                title: "Yan test",
                body: "Body body body",
                userId: 123
            }
        });

    expect(response.status()).toBe(201);

    const post = await response.json();

    expect(post.id).toEqual(expect.any(Number));
    expect(post.title).toBe('Yan test');
    expect(post.body).toBe('Body body body');
    expect(post.userId).toBe(123);
});

test('Update title', async ({ request }) => {
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                title: "Updated Title"
            }
        });
    
    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post.title).toBe('Updated Title');
});

test('Delete posts/1 by id', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
});

test('PUT post', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1',
        {
            data: {
                title: "Yan",
                body: "Body",
                userId: 1234
            }
        });

    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post.id).toEqual(expect.any(Number));
    expect(post.title).toBe('Yan');
    expect(post.body).toBe('Body');
    expect(post.userId).toBe(1234);
});
