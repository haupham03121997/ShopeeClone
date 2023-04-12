export interface SuccessResponseApi<T> {
    message: string
    data: T
}

export interface ErrorResponseApi<T> {
    message: string
    data?: T
}
