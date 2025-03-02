export function errorRespositoryResponse(error: unknown){
    return new Error(`${error}:`);
}