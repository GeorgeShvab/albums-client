import { createSlice } from '@reduxjs/toolkit'
import { OverlayState } from '../../types'

const initialState: OverlayState = {
    state: false,
}

const overlaySLice = createSlice({
    name: 'overlay',
    initialState,
    reducers: {
        showOverlay: (state: OverlayState) => {
            state.state = true
            const app: HTMLDivElement | null = document.querySelector('.App')
            const body: HTMLBodyElement | null = document.querySelector('body')
            if (!app) return
            if (app?.offsetHeight !== window.innerHeight) {
                app?.classList.add('_overflow-hidden')
            }
            if (body) body.style.overflow = 'hidden'
        },
        hideOverlay: (state: OverlayState) => {
            state.state = false
            const app: HTMLDivElement | null = document.querySelector('.App')
            const body: HTMLBodyElement | null = document.querySelector('body')
            if (!app) return
            if (body) body.style.overflow = 'auto'
            app?.classList.remove('_overflow-hidden')
        },
    },
})

export const getOverlayState = ({ overlay }: { overlay: OverlayState }) =>
    overlay.state

export default overlaySLice.reducer

export const { showOverlay, hideOverlay } = overlaySLice.actions
