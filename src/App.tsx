import { ConfigProvider } from 'antd'
import useRouteElement from './useRouteElement'

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
        </ConfigProvider>
    )
}

export default App
