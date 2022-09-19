import { configureStore } from '@reduxjs/toolkit'
import albums from './slices/albums'
import auth from './slices/auth'
import device from './slices/device'
import mobileMenu from './slices/mobileMenu'
import overlay from './slices/overlay'
import page from './slices/page'
import window from './slices/window'

const store = configureStore({
    reducer: {
        device,
        page,
        overlay,
        mobileMenu,
        auth,
        window,
        albums,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
