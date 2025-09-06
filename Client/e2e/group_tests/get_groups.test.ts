import test, { expect } from 'playwright/test';

test('test_group_data_propagation', async ({ page }) => {
	await page.route('**/groups', async (route) => {
		const json = [
			{
				id: 10,
				name: 'Test Group',
				description: 'This is a test',
				ownerId: 10,
				type: 'task_group',
				deleted: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 11,
				name: 'Test Group 2',
				description: 'This is a test 2',
				ownerId: 10,
				type: 'task_group',
				deleted: false,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];

		await route.fulfill({ json });
	});

	await page.goto('/groups');

	await expect(page.getByText('Test Group')).toBeVisible();
	await expect(page.getByText('This is a test')).toBeVisible();

	await expect(page.getByText('Test Group 2')).toBeVisible();
	await expect(page.getByText('This is a test 2')).toBeVisible();
});
