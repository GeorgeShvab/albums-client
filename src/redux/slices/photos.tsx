import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import {
    AddPhotoAction,
    CustomStore,
    DeletePhotosAction,
    MovePhotosAction,
    PhotosAction,
    PhotosState,
} from '../../types'
import { changeNumberOfPhotosAlbum } from './album'
import { addAlbum, changeNumberOfPhotos } from './albums'

export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async (albumId: string) => {
        const data = await axios.get(`/album/${albumId}/photos`)
        return data.data
    }
)

export const fetchDeletePhotos = createAsyncThunk(
    'photos/fetchDeletePhotos',
    async (_, { getState }) => {
        const store: any = getState()
        const data = await axios.delete('/photos', {
            data: store.selectionMode.selected,
        })
        return data.data
    }
)

export const fetchMovePhotos = createAsyncThunk(
    'photos/fetchMovePhotos',
    async (
        body: {
            album: string | { name: string; visibility: 'private' | 'public' }
        },
        { getState, dispatch }
    ) => {
        const store: any = getState()
        const data = await axios.patch('/photos/update', {
            ...body,
            photos: store.selectionMode.selected,
        })

        dispatch(
            changeNumberOfPhotos({
                albumId: store.album._id,
                count: -Number(store.selectionMode.selected.length),
            })
        )
        dispatch(
            changeNumberOfPhotosAlbum({
                albumId: store.album._id,
                count: -Number(store.selectionMode.selected.length),
            })
        )

        if (typeof body.album === 'string') {
            dispatch(
                changeNumberOfPhotos({
                    albumId: body.album,
                    count: Number(store.selectionMode.selected.length),
                })
            )
        } else {
            dispatch(addAlbum(data.data.data.album))
        }

        return data.data
    }
)

export const fetchAddPhotos = createAsyncThunk(
    'photos/fetchAddPhotos',
    async (body: FormData, { dispatch, getState }) => {
        const data = await axios.post('/photo', body)

        const store: any = getState()

        if (data.data.data.album) {
            dispatch(addAlbum(data.data.data.album))
        }

        if (store.album.data?._id === data.data.data.photos[0].album) {
            dispatch(changeNumberOfPhotosAlbum(data.data.data.photos.length))
        }

        dispatch(
            changeNumberOfPhotos({
                albumId: data.data.data.photos[0].album,
                count: data.data.data.photos.length,
            })
        )

        return data.data.data
    }
)

const initialState: PhotosState = {
    status: 'loading',
    data: null,
}

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        cleanPhotosState: (state: PhotosState) => {
            state.data = null
            state.status = 'loading'
        },
    },
    extraReducers: {
        [fetchPhotos.fulfilled.type]: (
            state: PhotosState,
            action: PhotosAction
        ) => {
            state.status = 'loaded'
            state.data = action.payload.data
        },
        [fetchPhotos.rejected.type]: (state: PhotosState) => {
            state.status = 'error'
        },
        [fetchDeletePhotos.fulfilled.type]: (
            state: PhotosState,
            action: DeletePhotosAction
        ) => {
            if (state.data) {
                state.data = state.data.filter(
                    (item) => !action.payload.data.includes(item._id)
                )
            }
        },
        [fetchMovePhotos.fulfilled.type]: (
            state: PhotosState,
            action: MovePhotosAction
        ) => {
            if (state.data) {
                state.data = state.data.filter(
                    (item) => !action.payload.data.photos.includes(item._id)
                )
            }
        },
        [fetchAddPhotos.fulfilled.type]: (
            state: PhotosState,
            action: AddPhotoAction
        ) => {
            if (
                state.data &&
                state.data[0].album === action.payload.photos[0].album
            ) {
                state.data = [...action.payload.photos, ...state.data]
            }
        },
    },
})

export default photosSlice.reducer

export const { cleanPhotosState } = photosSlice.actions

export const getPhotos = ({ photos }: { photos: PhotosState }) => photos.data
