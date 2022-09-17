import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
import device from './slices/device'
import mobileMenu from './slices/mobileMenu'
import overlay from './slices/overlay'
import page from './slices/page'

const store = configureStore({
    reducer: {
        device,
        page,
        overlay,
        mobileMenu,
        auth,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
