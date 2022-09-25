import { createSlice } from '@reduxjs/toolkit'
import { WindowAction, WindowState } from '../../types'

const initialState: WindowState = {
    state: false,
    type: null,
    data: null,
}

const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        showWindow: (state: WindowState, action: WindowAction) => {
            state.state = true
            if (typeof action.payload === 'object') {
                state.type = action.payload.type
                state.data = action.payload.data
            } else {
                state.type = action.payload
            }
        },
        hideWindow: (state: WindowState) => {
            state.state = false
            state.type = null
        },
    },
})

export default windowSlice.reducer

export const { showWindow, hideWindow } = windowSlice.actions

export const getWindowState = ({ window }: { window: WindowState }) => window
