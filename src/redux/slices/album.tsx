import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'
import {
    AlbumAction,
    AlbumState,
    ChangeNumberOfPhotosAction,
} from '../../types'

export const fetchAlbum = createAsyncThunk(
    'album/fetchAlbum',
    async (albumId: string) => {
        const data = await axios.get(`/album/${albumId}`)
        return data.data
    }
)

const initialState: AlbumState = {
    status: 'loading',
    data: null,
}

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        cleanAlbumState: (state: AlbumState) => {
            state.data = null
            state.status = 'loading'
        },
        changeAlbumName: (
            state: AlbumState,
            action: { payload: { albumId: string; name: string } }
        ) => {
            if (state.data && state.data?._id === action.payload.albumId) {
                state.data.name = action.payload.name
            }
        },
        changeAlbumVisibility: (
            state: AlbumState,
            action: { payload: { albumId: string } }
        ) => {
            if (state.data && state.data?._id === action.payload.albumId) {
                state.data.visibility =
                    state.data.visibility === 'private' ? 'public' : 'private'
            }
        },
        changeNumberOfPhotosAlbum: (
            state: AlbumState,
            action: ChangeNumberOfPhotosAction
        ) => {
            if (state.data) {
                state.data = {
                    ...state.data,
                    count: state.data?.count + action.payload.count,
                }
            }
        },
        setDescription: (state: AlbumState, action: { payload: string }) => {
            if (state.data) {
                state.data.description = action.payload
            }
        },
    },
    extraReducers: {
        [fetchAlbum.fulfilled.type]: (
            state: AlbumState,
            action: AlbumAction
        ) => {
            state.status = 'loaded'
            state.data = action.payload.data
        },
        [fetchAlbum.rejected.type]: (state: AlbumState) => {
            state.status = 'error'
        },
    },
})

export default albumSlice.reducer

export const {
    cleanAlbumState,
    changeAlbumName,
    changeAlbumVisibility,
    changeNumberOfPhotosAlbum,
    setDescription,
} = albumSlice.actions

export const getAlbum = ({ album }: { album: AlbumState }) => album.data
