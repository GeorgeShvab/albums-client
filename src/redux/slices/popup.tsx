import { createSlice } from '@reduxjs/toolkit'
import { PopupAction, PopupState, PopupType } from '../../types'
import { AppDispatch } from '../store'
import { hideOverlay, showOverlay } from './overlay'

const initialState: PopupState = {
    state: false,
    type: null,
    data: null,
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        showPopup: (state: PopupState, { payload }: PopupAction) => {
            state.state = true
            state.type = payload.type
            if (payload.data) state.data = payload.data
        },
        hidePopup: (state) => {
            state.state = false
            state.type = null
        },
    },
})

export default popupSlice.reducer

export const closePopup = (dispatch: AppDispatch) => {
    dispatch(hideOverlay())
    dispatch(popupSlice.actions.hidePopup())
}

export const getPopupState = ({ popup }: { popup: PopupState }) => popup

export const showPopup = ({
    type,
    dispatch,
    data,
}: {
    type: PopupType
    dispatch: AppDispatch
    data?: any
}) => {
    dispatch(showOverlay())
    dispatch(popupSlice.actions.showPopup({ type, data: data ? data : null }))
}
