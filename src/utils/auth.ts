import { User } from 'src/types/user.type'
export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)

export const getAccessTokenToLS = () => localStorage.getItem('access_token') || ''

export const getCurrentUser = () => {
    const result = localStorage.getItem('profile')
    return result ? JSON.parse(result) : null
}

export const setCurrentUser = (currentUser: User) => {
    localStorage.setItem('profile', JSON.stringify(currentUser))
}

export const removeCurrentUser = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
    const removeEventCurrentUser = new Event('removeEventCurrentUser')
    LocalStorageEventTarget.dispatchEvent(removeEventCurrentUser)
}
