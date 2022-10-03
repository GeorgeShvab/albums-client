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
            const body = document.querySelector('body')
            if (body?.offsetHeight !== window.innerHeight) {
                body?.classList.add('_overflow-hidden')
            }
            if (body) body.style.overflow = 'hidden'
        },
        hideOverlay: (state: OverlayState) => {
            state.state = false
            const body = document.querySelector('body')
            if (body) body.style.overflow = 'auto'
            body?.classList.remove('_overflow-hidden')
        },
    },
})

export const getOverlayState = ({ overlay }: { overlay: OverlayState }) =>
    overlay.state

export default overlaySLice.reducer

export const { showOverlay, hideOverlay } = overlaySLice.actions
