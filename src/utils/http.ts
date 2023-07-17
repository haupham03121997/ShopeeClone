import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-hot-toast'
import { AuthResponse } from 'src/types/auth.type'
import { removeCurrentUser, setAccessTokenToLS, getAccessTokenToLS, setCurrentUser } from './auth'
class Http {
    instance: AxiosInstance
    private accessToken: string
    constructor() {
        this.accessToken = getAccessTokenToLS()
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })

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
                if (response.config.url === '/login' || response.config.url === '/register') {
                    this.accessToken = (response.data as AuthResponse).data.access_token
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
                    const message = data.message || error.message
                    toast.error(message)
                }
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance

export default http
