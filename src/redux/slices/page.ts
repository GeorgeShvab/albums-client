import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Page, PageState } from '../../types'

const initialState: PageState = {
    page: 'home',
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state: PageState, action: Action & { payload: Page }) => {
            state.page = action.payload
        },
    },
})

export const getCurrentPage = ({ page }: { page: PageState }) => page.page

export default pageSlice.reducer

export const { setPage } = pageSlice.actions
