import { GroupRepository } from "../repositories/GroupRepo.repository";
import { JournalRepository } from "../repositories/JournalRepository";
import { TaskRepository } from "../repositories/TaskRepo.repository";

class SoftDeleteCascadeAndJournal {
    private instance: SoftDeleteCascadeAndJournal;

    constructor(
        private groupRepository: GroupRepository,
        private journalRepository: JournalRepository,
        private taskRepository: TaskRepository
    ) {}

    async groupCascadeSoftDelete(groupIds: string[]): Promise<void> {
        if (groupIds.length === 0) {
            throw new Error("No groups provided for deletion!");
        }
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];

            const removedMember = await this.groupRepository.removeGroupMembers(
                groupId
            );
            await this.journalRepository.createJournal({
                action: "Parent Group Deleted",
                description:
                    "The parent group this member resides in has been deleted.",
                metadata: {
                    removedParentGroup: groupId,
                    groupMemberUserId: removedMember.userId,
                    groupMemberTableId: removedMember.id,
                },
            });

            const removedTask = await this.taskRepository.deleteTask(groupId);
            await this.journalRepository.createJournal({
                action: "Parent Group Deleted",
                description:
                    "The parent group this task resides in has been deleted.",
                metadata: {
                    removedParentGroup: groupId,
                    taskTableId: removedTask.id,
                },
            });

            const removedAssignee =
                await this.taskRepository.removeTaskAssignees(groupId);
            if (removedAssignee) {
                await this.journalRepository.createJournal({
                    action: "Parent Task Deleted",
                    description:
                        "The parent task this member resides in has been deleted.",
                    metadata: {
                        removedParentTask: removedAssignee.parentTaskId,
                        assigneeUserId: removedAssignee.assigneeId,
                        assigneeTableId: removedAssignee.id,
                    },
                });
            }
            else {
                return;
            }
        }
    }
}

export const deletionCascade = new SoftDeleteCascadeAndJournal(
    new GroupRepository(),
    new JournalRepository(),
    new TaskRepository()
);
