export class ResponseFormat<T> {
    data: T | null;
    error: string | null;
    constructor({error, data}: {error: string | null, data: T | null}) {
        if (error === undefined || data === undefined) throw new Error("Invalid response format");
        if (error === null && data === null) throw new Error("Invalid response format");
        this.data = data;
        this.error = error;
    }
}