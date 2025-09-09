



class DeleteAndLog {
    async determineRelations(payload: any) {
        const { tableName, rowId } = payload;

        switch (tableName) {
            case tableName === "user":
                // call here
                break;
            case tableName === "taskGroup":
                
                break;
            case tableName === "groupMembers":
                break;
            case tableName === "task":
                break;
            case tableName === "taskAssignee":
                break;
        }
    }

    
}

export const deleteAndLog = new DeleteAndLog();
