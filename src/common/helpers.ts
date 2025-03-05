export function errorResponse(error: unknown){
    return new Error(`${error}:`);
}