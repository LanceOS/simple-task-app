

export const FetchHandler = {
    fetch: async (route: string, type: string, data: any | null) => {
        const options: RequestInit = {
            method: type.toUpperCase(),
            headers: {
                "Content-Type": "application/json"
            }
        }

        if(data) {
            options.body = JSON.stringify(data)
        }

        return await fetch(route, options)
    }
}