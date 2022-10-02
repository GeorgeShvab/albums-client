import { createSlice, createAsyncThunk, Store } from '@reduxjs/toolkit'
import axios from '../../axios'
import {
    Album,
    AlbumsAction,
    AlbumsActionOne,
    AlbumsState,
    AlbumUpdateParams,
    AuthState,
    ChangeNumberOfPhotosAction,
    CustomStore,
} from '../../types'
import { changeAlbumName, changeAlbumVisibility } from './album'

export const fetchAlbums = createAsyncThunk(
    'albums/fetchAlbums',
    async (_, { rejectWithValue, getState }) => {
        try {
            const store: any = getState()
            const userId = store?.auth?.data?._id

            if (!userId) throw new Error('no connection to the server')

            const data = await axios.get(`/user/${userId}/albums?amount=30`)
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

export const fetchDeleteAlbum = createAsyncThunk(
    'albums/fetchDeleteAlbum',
    async (albumId: string) => {
        const data = await axios.delete(`/album/${albumId}`)

        return data.data
    }
)

export const fetchChangeVisibility = createAsyncThunk(
    'albums/fetchChangeVisibility',
    async ({ albumId, visibility }: AlbumUpdateParams, { dispatch }) => {
        const data = await axios.patch(`/album/${albumId}`, {
            visibility: visibility,
        })

        dispatch(changeAlbumVisibility({ albumId: albumId }))

        return data.data
    }
)

export const fetchChangeName = createAsyncThunk(
    'albums/fetchChangeName',
    async (params: AlbumUpdateParams, { rejectWithValue, dispatch }) => {
        try {
            const data = await axios.patch(`/album/${params.albumId}`, {
                newName: params.name,
            })

            if (params.name) {
                dispatch(
                    changeAlbumName({
                        albumId: params.albumId,
                        name: params.name,
                    })
                )
            }

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

export const fetchChangePreview = createAsyncThunk(
    'albums/fetchChangePreview',
    async (
        params: { albumId: string; body: FormData },
        { rejectWithValue }
    ) => {
        try {
            const data = await axios.patch(
                `/album/${params.albumId}/background`,
                params.body
            )

            return data.data
        } catch (e: any) {
            if (!e.response) throw e

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
        changeNumberOfPhotos: (
            state: AlbumsState,
            action: ChangeNumberOfPhotosAction
        ) => {
            if (state.data) {
                state.data = state.data.map((item) => {
                    if (item._id === action.payload.albumId) {
                        return {
                            ...item,
                            count: item.count + action.payload.count,
                        }
                    }
                    return item
                })
            }
        },
        addAlbum: (state: AlbumsState, action: { payload: Album }) => {
            state.data?.unshift(action.payload)
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
        [fetchDeleteAlbum.fulfilled.type]: (
            state: AlbumsState,
            action: AlbumsAction
        ) => {
            state.status = 'loaded'
            if (state.data) {
                state.data = state.data.filter(
                    (item) => item._id !== action.meta.arg
                )
            }
        },
        [fetchChangeVisibility.fulfilled.type]: (
            state: AlbumsState,
            action: AlbumsAction
        ) => {
            if (state.data) {
                state.data = state.data.map((item) => {
                    if (item._id === action.meta.arg.albumId) {
                        return {
                            ...item,
                            visibility: action.meta.arg.visibility,
                        }
                    }
                    return item
                })
            }
        },
        [fetchChangeName.fulfilled.type]: (
            state: AlbumsState,
            action: AlbumsAction
        ) => {
            if (state.data) {
                state.data = state.data.map((item) => {
                    if (item._id === action.meta.arg.albumId) {
                        return { ...item, name: action.meta.arg.name }
                    }

                    return item
                })
            }
        },
        [fetchChangePreview.fulfilled.type]: (
            state: AlbumsState,
            action: AlbumsActionOne
        ) => {
            console.log(action.payload)
            if (state.data) {
                state.data = state.data.map((item) => {
                    if (item._id === action.meta.arg.albumId) {
                        return {
                            ...item,
                            background: action.payload.data.background,
                        }
                    }
                    return item
                })
            }
        },
    },
})

export const getAlbums = ({ albums }: { albums: AlbumsState }) => albums.data

export default albumsSlice.reducer
export const { cleanAlbums, changeNumberOfPhotos, addAlbum } =
    albumsSlice.actions
