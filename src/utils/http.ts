import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-hot-toast'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import { removeCurrentUser, setAccessTokenToLS, getAccessTokenToLS, setCurrentUser } from './auth'
import { config } from 'src/constants/config'
import { isAxiosErrorUnauthorizedEntity, isAxiosExpiredTokenError } from './utils'
class Http {
    instance: AxiosInstance
    private accessToken: string
    private refreshToken: string
    private refreshTokenRequest: Promise<string> | null
    constructor() {
        this.accessToken = getAccessTokenToLS()
        this.instance = axios.create({
            baseURL: config.baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 10,
                'expire-refresh-token': 60 * 60
            }
        })
        this.refreshTokenRequest = null

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = this.accessToken
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                if (response.config.url === 'login' || response.config.url === 'register') {
                    this.accessToken = (response.data as AuthResponse).data.access_token
                    this.refreshToken = (response.data as AuthResponse).data.refresh_token
                    const currentUser = (response.data as AuthResponse).data.user
                    setAccessTokenToLS(this.accessToken)
                    setCurrentUser(currentUser)
                } else if (response.config.url === '/logout') {
                    this.accessToken = ''
                    removeCurrentUser()
                }

                return response
            },
            (error: AxiosError) => {
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data
                    const message = data?.message || error.message
                    toast.error(message)
                }
                if (isAxiosErrorUnauthorizedEntity(error)) {
                    const config = error.response?.config
                    const url = config?.url
                    if (isAxiosExpiredTokenError(error) && url !== '/refresh-access-token') {
                        this.refreshTokenRequest = this.refreshTokenRequest
                            ? this.refreshTokenRequest
                            : this.handleRefreshToken().finally(() => (this.refreshTokenRequest = null))
                        return this.refreshTokenRequest.then((access_token) => {
                            if (config?.headers) config.headers.authorization = access_token
                            return this.instance({
                                ...(config || {}),
                                headers: { ...config?.headers, authorization: access_token }
                            })
                        })
                    }

                    removeCurrentUser()
                    this.accessToken = ''
                    this.refreshTokenRequest = null
                }

                return Promise.reject(error)
            }
        )
    }
    private handleRefreshToken() {
        return this.instance
            .post<RefreshTokenResponse>('/refresh-access-token', {
                refresh_token: this.refreshToken
            })
            .then((response) => {
                const { access_token } = response.data.data
                setAccessTokenToLS(access_token)
                this.accessToken = access_token
                return access_token
            })
            .catch((error) => {
                removeCurrentUser()
                this.accessToken = ''
                throw error
            })
    }
}

const http = new Http().instance

export default http
