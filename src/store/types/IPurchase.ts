import { Purchase } from 'src/types/purchaces.type'

interface ExtendedPurchase extends Purchase {
    disabled: boolean
    checked: boolean
}

export interface IPurchase {
    extendedPurchaseStore: ExtendedPurchase[]
    setProducts: (payload: ExtendedPurchase[]) => void
}
