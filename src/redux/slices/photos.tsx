import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import {
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
        body: { newAlbum: string | false; albumId?: string },
        { getState, dispatch }
    ) => {
        const store: any = getState()
        const data = await axios.patch(
            '/photos/update',
            body.newAlbum
                ? {
                      photos: store.selectionMode.selected,
                      newAlbum: { name: body.newAlbum, visibility: 'private' },
                  }
                : {
                      photos: store.selectionMode.selected,
                      album: body.albumId,
                  }
        )

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
        if (body.albumId) {
            dispatch(
                changeNumberOfPhotos({
                    albumId: body.albumId,
                    count: Number(store.selectionMode.selected.length),
                })
            )
        }

        if (body.newAlbum) {
            dispatch(addAlbum(data.data.data.album))
        }

        return data.data
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
    },
})

export default photosSlice.reducer

export const { cleanPhotosState } = photosSlice.actions

export const getPhotos = ({ photos }: { photos: PhotosState }) => photos.data
