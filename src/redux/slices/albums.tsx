import { createSlice, createAsyncThunk, Store } from '@reduxjs/toolkit'
import axios from '../../axios'
import {
    AlbumsAction,
    AlbumsActionOne,
    AlbumsState,
    AuthState,
    CustomStore,
} from '../../types'

export const fetchAlbums = createAsyncThunk(
    'albums/fetchAlbums',
    async (_, { rejectWithValue, getState }) => {
        try {
            const store: any = getState()
            const userId = store?.auth?.data?._id

            if (!userId) throw new Error('no connection to the server')

            const data = await axios.get(`/user/${userId}/albums`)
            return data.data
        } catch (e: any) {
            if (!e.response) {
                throw e
            }

            return rejectWithValue(e.response)
        }
    }
)

export const fetchAddAlbum = createAsyncThunk(
    'albums/fetchAddAlbum',

    async (
        body: { visibility: 'public' | 'private'; name: string },
        { rejectWithValue }
    ) => {
        try {
            const data = await axios.post('/album', body)
            return data.data
        } catch (e: any) {
            if (!e.response) {
                throw e
            }

            if (e.code === 'ERR_NETWORK') {
                throw e
            }

            return rejectWithValue(e.response)
        }
    }
)

const initialState: AlbumsState = {
    status: 'loading',
    data: null,
}

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        cleanAlbums: (state: AlbumsState) => {
            state.status = 'loading'
            state.data = null
        },
    },
    extraReducers: {
        [fetchAlbums.pending.type]: (state: AlbumsState) => {
            state.status = 'loading'
        },
        [fetchAlbums.fulfilled.type]: (
            state: AlbumsState,
            action: AlbumsAction
        ) => {
            state.data = action.payload.data
            state.status = 'loaded'
        },
        [fetchAlbums.rejected.type]: (state: AlbumsState) => {
            state.status = 'error'
        },
        [fetchAddAlbum.fulfilled.type]: (
            state: AlbumsState,
            action: AlbumsActionOne
        ) => {
            state.status = 'loaded'
            if (state.data) {
                state.data.unshift(action.payload.data)
            } else {
                state.data = [action.payload.data]
            }
        },
        [fetchAddAlbum.rejected.type]: (state: AlbumsState) => {},
    },
})

export const getAlbums = ({ albums }: { albums: AlbumsState }) => albums.data

export default albumsSlice.reducer
export const { cleanAlbums } = albumsSlice.actions
