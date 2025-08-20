

export const ResponseHandler = {
    jsonResponse: (data: any, status: number) => {
        return new Response(JSON.stringify(data), {
            status: status,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}