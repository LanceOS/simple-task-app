

export const ResponseHandler = {
    jsonResponse: (message: string, status: number) => {
        return new Response(JSON.stringify({message}), {
            status: status,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export class HttpError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }
}