import { relations } from "drizzle-orm";
import { user } from "./authentication";
import { taskAssignee } from "./task_assignee.schema";
import { task } from "./task.schema";
import { groupMember } from "./group_members.schema";
import { taskGroup } from "./task_group.schema";

export const userRelations = relations(user, ({ many }) => ({
    taskAssignees: many(taskAssignee),
    taskGroups: many(groupMember)
}));

export const taskRelations = relations(task, ({ many }) => ({
    taskAssignees: many(taskAssignee),
}));

export const taskAssigneeRelations = relations(taskAssignee, ({ one }) => ({
    assignee: one(user, {
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
    user: one(user, {
        fields: [groupMember.userId],
        references: [user.id]
    }),
    group: one(taskGroup, {
        fields: [groupMember.parentGroupId],
        references: [taskGroup.id]
    })
}));