import { relations } from "drizzle-orm";
import { user } from "./authentication.ts";
import { taskAssignee } from "./task_assignee.schema.ts";
import { task } from "./task.schema.ts";
import { groupMember } from "./group_members.schema.ts";
import { taskGroup } from "./task_group.schema.ts";

export const userRelations = relations(user, ({ many }) => ({
    taskAssignees: many(taskAssignee),
    taskGroups: many(groupMember)
}));

export const taskRelations = relations(task, ({ many }) => ({
    taskAssignees: many(taskAssignee),
}));

export const taskAssigneeRelations = relations(taskAssignee, ({ one }) => ({
    member: one(user, {
        fields: [taskAssignee.assigneeId],
        references: [user.id],
    }),
    task: one(task, {
        fields: [taskAssignee.parentTaskId],
        references: [task.id],
    }),
}));


export const groupRelations = relations(taskGroup, ({ many }) => ({
    taskGroups: many(groupMember)
}));


export const groupMemberRelations = relations(groupMember, ({ one }) => ({
    member: one(user, {
        fields: [groupMember.userId],
        references: [user.id]
    }),
    group: one(taskGroup, {
        fields: [groupMember.parentGroupId],
        references: [taskGroup.id]
    })
}));