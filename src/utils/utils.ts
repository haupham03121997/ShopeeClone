import axios, { isAxiosError, AxiosError, HttpStatusCode } from 'axios'

// error from axios
export function isAxiosErrorFuncs<T>(errors: unknown): errors is AxiosError<T> {
    return isAxiosError(errors)
}

export function isAxiosErrorUnprocessableEntity<T>(errors: unknown): errors is AxiosError<T> {
    return isAxiosError(errors) && errors.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
    return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1
    })
        .format(value)
        .replace('.', ',')
        .toLowerCase()
}
