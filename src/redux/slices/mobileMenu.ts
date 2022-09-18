import { createSlice } from '@reduxjs/toolkit'
import { MobileMenuAction, MobileMenuState } from '../../types'

const initialState: MobileMenuState = {
    state: false,
    type: null,
}

const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState,
    reducers: {
        showMobileMenu: (state: MobileMenuState, action: MobileMenuAction) => {
            state.state = true
            state.type = action.payload
        },
        hideMobileMenu: (state) => {
            state.state = false
            state.type = null
        },
    },
})

export const getMobileMenuState = ({
    mobileMenu,
}: {
    mobileMenu: MobileMenuState
}) => mobileMenu

export default mobileMenuSlice.reducer

export const { showMobileMenu, hideMobileMenu } = mobileMenuSlice.actions
