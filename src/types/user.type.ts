type Role = 'User' | 'Admin'

export interface User {
    roles: Role[]
    _id: string
    email: string
    createdAt: Date
    updatedAt: Date
    __v: number
}
