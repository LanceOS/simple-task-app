// import test, { expect } from 'playwright/test';

// test('test navigation to group dashboard (owned groups)', async ({ page }) => {
// 	await page.route('**/groups', async (route) => {
// 		const json = [
// 			{
// 				id: 10,
// 				name: 'Test Group',
// 				description: 'This is a test',
// 				ownerId: 10,
// 				type: 'task_group',
// 				deleted: false,
// 				createdAt: new Date(),
// 				updatedAt: new Date()
// 			}
// 		];

// 		await route.fulfill({ json });
// 	});

// 	await page.goto('/groups');

    
// });
