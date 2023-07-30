import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IPurchase } from '../types/IPurchase'

const extendedPurchaseSlice = (
    set: (
        partial: IPurchase | Partial<IPurchase> | ((state: IPurchase) => IPurchase | Partial<IPurchase>),
        replace?: boolean | undefined
    ) => void
): IPurchase => ({
    extendedPurchaseStore: [],
    setProducts: (payload) => set({ extendedPurchaseStore: payload })
})

const devtoolsPeopleStore = devtools(extendedPurchaseSlice)

const useExtendedPurchaseSlice = create(devtoolsPeopleStore)

export default useExtendedPurchaseSlice
