import { User } from './user.type'
import { SuccessResponseApi } from './utils.type'

export type AuthResponse = SuccessResponseApi<{
    access_token: string
    refresh_token: string
    expires: number
    expires_refresh_token: number
    user: User
}>
export type RefreshTokenResponse = SuccessResponseApi<{
    access_token: string
}>
