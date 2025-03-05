
export class ApiError extends Error {
    constructor(
        statusCode,
        error
    ){
        super();
        this.statusCode = statusCode,
        this.error = error   
    }
}

