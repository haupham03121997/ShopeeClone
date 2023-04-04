import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-hot-toast'

class Http {
    instance: AxiosInstance
    constructor() {
        ;(this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })),
            this.instance.interceptors.response.use(
                (response) => {
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
