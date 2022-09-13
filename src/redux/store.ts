import { configureStore, Store } from '@reduxjs/toolkit'
import device from './slices/device'
import mobileMenu from './slices/mobileMenu'
import overlay from './slices/overlay'
import page from './slices/page'

const store: Store = configureStore({
    reducer: {
        device: device,
        page: page,
        overlay: overlay,
        mobileMenu: mobileMenu,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
