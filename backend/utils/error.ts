
export const errorHandler = (statusCode: any, message: any) => {
    const error = new Error(message) as any
    error.statusCode = statusCode
    return error
}