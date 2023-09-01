import { ConfigProvider, theme } from 'antd'
import { Toaster } from 'react-hot-toast'
import useRouteElement from './useRouteElement'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import { useEffect } from 'react'
// import { LocalStorageEventTarget } from './utils/auth'
// import useAppContext from './hooks/useAppContext'

function App() {
    // const { setIsAuthenticated, setCurrentUser } = useAppContext()
    // useEffect(() => {
    //     const reset = () => {
    //         setIsAuthenticated(false)
    //         setCurrentUser(null)
    //     }
    //     LocalStorageEventTarget.addEventListener('removeEventCurrentUser', reset)
    //     return () => {
    //         LocalStorageEventTarget.removeEventListener('removeEventCurrentUser', reset)
    //     }
    // }, [setCurrentUser, setIsAuthenticated])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0010f7'
                },
                algorithm: theme.darkAlgorithm
            }}
        >
            {useRouteElement()}
            <Toaster />
        </ConfigProvider>
    )
}

export default App
