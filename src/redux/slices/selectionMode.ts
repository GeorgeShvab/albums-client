import { createSlice } from '@reduxjs/toolkit'
import { SelectAction, SelectionModeState } from '../../types'

const initialState: SelectionModeState = {
    state: false,
    selected: [],
}

const selectionModeSlice = createSlice({
    name: 'selectionMode',
    initialState,
    reducers: {
        activateSelectionMode: (state: SelectionModeState) => {
            state.state = true
        },
        deactivateSelectionMode: (state: SelectionModeState) => {
            state.state = false
            state.selected = []
        },
        addPhotoToSelected: (
            state: SelectionModeState,
            action: SelectAction
        ) => {
            state.selected?.push(action.payload)
        },
        removePhotoFromSelected: (
            state: SelectionModeState,
            action: SelectAction
        ) => {
            state.selected = state.selected.filter(
                (item) => item !== action.payload
            )
        },
    },
})

export default selectionModeSlice.reducer

export const {
    activateSelectionMode,
    deactivateSelectionMode,
    addPhotoToSelected,
    removePhotoFromSelected,
} = selectionModeSlice.actions

export const isSelectionMode = ({
    selectionMode,
}: {
    selectionMode: SelectionModeState
}): SelectionModeState => selectionMode
