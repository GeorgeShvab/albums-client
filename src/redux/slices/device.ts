import { createSlice } from '@reduxjs/toolkit'
import { DeviceState } from '../../types'

const initialState: DeviceState = {
    isMobile: window.innerWidth <= 768 ? true : false,
}

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setIsMobile: (state: DeviceState, action) => {
            state.isMobile = action.payload
        },
    },
})

export const isMobile = ({ device }: { device: DeviceState }) => device.isMobile

export default deviceSlice.reducer
export const { setIsMobile } = deviceSlice.actions
