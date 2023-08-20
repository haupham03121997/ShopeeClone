type Role = 'User' | 'Admin'

export interface User {
    roles: Role[]
    _id: string
    email: string
    createdAt: Date
    updatedAt: Date
    name: string
    date_of_birth: string
    address: string
    phone: string
    avatar: string
}
