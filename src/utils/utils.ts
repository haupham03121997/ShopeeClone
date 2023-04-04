import axios, { isAxiosError, AxiosError, HttpStatusCode } from 'axios'

// error from axios
export function isAxiosErrorFuncs<T>(errors: unknown): errors is AxiosError<T> {
    return isAxiosError(errors)
}

export function isAxiosErrorUnprocessableEntity<T>(errors: unknown): errors is AxiosError<T> {
    return isAxiosError(errors) && errors.response?.status === HttpStatusCode.UnprocessableEntity
}
