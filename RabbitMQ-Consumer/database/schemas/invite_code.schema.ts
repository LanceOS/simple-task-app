import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { base } from './structures/SchemaBase.schema.ts';
import { taskGroup } from './task_group.schema.ts';
import { user } from './authentication.ts';
import type { InferSelectModel } from 'drizzle-orm';

export const inviteCode = pgTable('invite_code', {
	code: text('code').notNull(),
	parentGroupId: uuid('parent_group_id')
		.references(() => taskGroup.id)
		.notNull(),
	sentTo: text("sent_to").references(() => user.email).notNull(),
	expiresAt: timestamp('expires_at').$default(() => new Date(Date.now() + 1000 * 60 * 60 * 24)).notNull(),
	...base('code')
});


export type IInviteSchema = InferSelectModel<typeof inviteCode>
