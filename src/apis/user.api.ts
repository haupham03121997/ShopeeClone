import { User } from 'src/types/user.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile {
    address?: string
    date_of_birth?: string
    name?: string
    phone?: string
    avatar?: string
    password?: string
    new_password?: string
}

const userApi = {
    getProfile() {
        return http.get<SuccessResponseApi<User>>('me')
    },
    updateProfile(body: BodyUpdateProfile) {
        return http.put<SuccessResponseApi<User>>('user', body)
    },
    uploadAvatar(body: FormData) {
        return http.post<SuccessResponseApi<string>>('user/upload-avatar', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default userApi
