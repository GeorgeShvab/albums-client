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
        },
        hideOverlay: (state: OverlayState) => {
            state.state = false
        },
    },
})

export const getOverlayState = ({ overlay }: { overlay: OverlayState }) =>
    overlay.state

export default overlaySLice.reducer

export const { showOverlay, hideOverlay } = overlaySLice.actions
