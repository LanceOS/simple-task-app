import { user } from "../schemas/authentication";
import { groupMember } from "../schemas/group_members.schema";
import { task } from "../schemas/task.schema";
import { taskAssignee } from "../schemas/task_assignee.schema";
import { taskGroup } from "../schemas/task_group.schema";

const schemaMap = {
  user,
  task,
  taskAssignee,
  taskGroup,
  groupMember,
};

export type SchemaTables = keyof typeof schemaMap;

export const getSchemaObject = (tableName: SchemaTables) => {
  const schema = schemaMap[tableName];
  if (!schema) {
    throw new Error(`Table with name '${tableName}' not found in schema map.`);
  }
  return schema;
};
