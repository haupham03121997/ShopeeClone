import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IModal } from '../types/IModal'

const sliceModalLogin = (
    set: (
        partial: IModal | Partial<IModal> | ((state: IModal) => IModal | Partial<IModal>),
        replace?: boolean | undefined
    ) => void
): IModal => ({
    isOpenModalLogin: false,
    setIsOpenModalLogin: (payload) => set({ isOpenModalLogin: payload })
})

const devtoolsPeopleStore = devtools(sliceModalLogin)

const useModalLoginSlice = create(devtoolsPeopleStore)

export default useModalLoginSlice
