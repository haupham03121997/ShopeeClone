import { ConfigProvider } from 'antd'
import { Toaster } from 'react-hot-toast'
import useRouteElement from './useRouteElement'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0010f7'
                }
            }}
        >
            {useRouteElement()}
            <Toaster />
        </ConfigProvider>
    )
}

export default App
