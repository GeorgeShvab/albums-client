import { createSlice } from '@reduxjs/toolkit'
import { MobileMenuState } from '../../types'

const initialState: MobileMenuState = {
    state: false,
}

const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState,
    reducers: {
        showMobileMenu: (state: MobileMenuState) => {
            state.state = true
        },
        hideMobileMenu: (state) => {
            state.state = false
        },
    },
})

export const getMobileMenuState = ({
    mobileMenu,
}: {
    mobileMenu: MobileMenuState
}) => mobileMenu.state

export default mobileMenuSlice.reducer

export const { showMobileMenu, hideMobileMenu } = mobileMenuSlice.actions
