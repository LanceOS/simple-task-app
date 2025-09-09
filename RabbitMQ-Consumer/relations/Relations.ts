
export type TableRelation = {
  tableName: string;
  relationType: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
};

export type SchemaRelations = {
  [tableName: string]: TableRelation[];
};

/**
 * The core metadata object that contains all schema relationships.
 * This is manually maintained and serves as the source of truth for all
 * relationship introspection.
 */
export const schemaRelations: SchemaRelations = {
  // Relationships for the 'user' table
  user: [
    {
      tableName: 'taskAssignee',
      relationType: 'one-to-many',
    },
    {
      tableName: 'groupMember',
      relationType: 'one-to-many',
    },
  ],

  // Relationships for the 'task' table
  task: [
    {
      tableName: 'taskAssignee',
      relationType: 'one-to-many',
    },
  ],

  // Relationships for the 'taskAssignee' table
  taskAssignee: [
    {
      tableName: 'user',
      relationType: 'many-to-one',
    },
    {
      tableName: 'task',
      relationType: 'many-to-one',
    },
  ],

  // Relationships for the 'taskGroup' table
  taskGroup: [
    {
      tableName: 'groupMember',
      relationType: 'one-to-many',
    },
  ],

  // Relationships for the 'groupMember' table
  groupMember: [
    {
      tableName: 'user',
      relationType: 'many-to-one',
    },
    {
      tableName: 'taskGroup',
      relationType: 'many-to-one',
    },
  ],
};


/**
 * A utility function to retrieve a list of related tables for a given table name.
 * @param tableName The name of the table to check for relationships.
 * @returns An array of strings, where each string is the name of a related table.
 */
export const getRelatedTables = (tableName: string): string[] => {
  const relations = schemaRelations[tableName];
  if (!relations) {
    return [];
  }
  return relations.map(rel => rel.tableName);
};