import { configureStore } from '@reduxjs/toolkit'
import album from './slices/album'
import albums from './slices/albums'
import auth from './slices/auth'
import selectionMode from './slices/selectionMode'
import device from './slices/device'
import overlay from './slices/overlay'
import page from './slices/page'
import photos from './slices/photos'
import profile from './slices/profile'
import popup from './slices/popup'

const store = configureStore({
    reducer: {
        device,
        page,
        overlay,
        auth,
        albums,
        photos,
        album,
        selectionMode,
        profile,
        popup,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
