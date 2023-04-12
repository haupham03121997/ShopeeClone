import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

function useAppContext() {
    return useContext(AppContext)
}
export default useAppContext
