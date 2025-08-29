import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { base } from './structures/SchemaBase.schema';
import { taskGroup } from './task_group.schema';
import { user } from './authentication';
import type { InferSelectModel } from 'drizzle-orm';

export const inviteCode = pgTable('invite_code', {
	code: text('code').notNull(),
	parentGroupId: uuid('parent_group_id')
		.references(() => taskGroup.id, { onDelete: 'cascade' })
		.notNull(),
	sentTo: text("sent_to").references(() => user.email, { onDelete: 'cascade' }).notNull(),
	expiresAt: timestamp('expires_at').$default(() => new Date(Date.now() + 1000 * 60 * 60 * 24)).notNull(),
	...base('code')
});


export type IInviteSchema = InferSelectModel<typeof inviteCode>
