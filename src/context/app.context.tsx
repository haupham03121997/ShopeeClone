import React, { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenToLS, getCurrentUser } from 'src/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | null
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenToLS()),
    setIsAuthenticated: () => null,
    currentUser: getCurrentUser(),
    setCurrentUser: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [currentUser, setCurrentUser] = useState<User | null>(initialAppContext.currentUser)
    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser }}>
            {children}
        </AppContext.Provider>
    )
}
