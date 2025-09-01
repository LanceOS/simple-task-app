
export const ResponseHandler = {
    json: <T>(data: T, status: number, options?: ResponseInit) => {
        const defaultHeaders = { "Content-Type": "application/json" };
        const finalHeaders = { ...defaultHeaders, ...options?.headers };

        return new Response(JSON.stringify(data), {
            status,
            ...options,
            headers: finalHeaders
        });
    }
};

export class HttpError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }
}