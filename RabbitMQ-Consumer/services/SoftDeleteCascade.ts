import { GroupRepository } from "../repositories/GroupRepo.repository";
import { JournalRepository } from "../repositories/JournalRepo.repository";
import { TaskRepository } from "../repositories/TaskRepo.repository";
import { schemaRelations } from "../relations/Relations";

export class SoftDeleteCascadeAndJournal {
    private static instance: SoftDeleteCascadeAndJournal;
    private processedItems: Set<string>;
    private journalingService: JournalRepository;
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

            const removedAssignee =
                await this.taskRepository.removeTaskAssignees(groupId);
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
        }
    }
}

export const deletionCascade = new SoftDeleteCascadeAndJournal(
    new GroupRepository(),
    new JournalRepository(),
    new TaskRepository()
);
