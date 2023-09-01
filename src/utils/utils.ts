import { isAxiosError, AxiosError, HttpStatusCode } from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { FORMAT_DATE } from 'src/constants/app'
import { config } from 'src/constants/config'
import UserDefault from 'src/assets/images/user-default.avif'

// error from axios
export function isAxiosErrorFuncs<T>(errors: unknown): errors is AxiosError<T> {
    return isAxiosError(errors)
}

export function isAxiosErrorUnprocessableEntity<T>(errors: unknown): errors is AxiosError<T> {
    return isAxiosError(errors) && errors.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosErrorUnauthorizedEntity<T>(errors: unknown): errors is AxiosError<T> {
    return isAxiosError(errors) && errors.response?.status === HttpStatusCode.Unauthorized
}
export function isAxiosExpiredTokenError<T>(errors: unknown): errors is AxiosError<T> {
    return (
        isAxiosErrorUnauthorizedEntity(errors) &&
        ((errors.response?.data as any)?.data?.name as string) === 'EXPIRED_TOKEN'
    )
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

export function isExitsKeyParamsUrl(key: string, searchParams: object) {
    return key in searchParams
}
export function removeSpecialCharacter(str: string) {
    // eslint-disable-next-line no-useless-escape
    return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export function generateNameId({ name, id }: { name: string; id: string }) {
    removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

export function getIdFromNameId(nameId: string) {
    const arr = nameId.split('-i.')
    return arr[arr.length - 1]
}

export function formatDate(date: Dayjs) {
    return dayjs(date).format(FORMAT_DATE)
}

export const getAvatarURL = (avatarName: string) => (avatarName ? `${config.baseURL}images/${avatarName}` : UserDefault)
