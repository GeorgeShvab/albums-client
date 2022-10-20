import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { ProfileAction, ProfileState } from '../../types'

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (userId: string) => {
        const userDataPromise = axios.get(`/user/${userId}?amount=200`)
        const userAlbumsPromise = axios.get(`/user/${userId}/albums?amount=200`)
        const userSaved = axios.get(`/user/${userId}/saved?amount=200`)

        const [userData, albumsData] = await Promise.all([
            userDataPromise,
            userAlbumsPromise,
            userSaved,
        ])

        const data = {
            ...userData.data.data,
            albums: albumsData.data.data,
            saved: (await userSaved).data.data,
            section: 'albums',
        }

        return { status: 200, data: data }
    }
)

const initialState: ProfileState = {
    status: 'loading',
    data: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setSection: (
            state: ProfileState,
            action: { payload: 'albums' | 'saved' }
        ) => {
            if (state.data) {
                state.data.section = action.payload
            }
        },
        clearProfileState: (state: ProfileState) => {
            state.data = null
            state.status = 'loading'
        },
    },
    extraReducers: {
        [fetchProfile.fulfilled.type]: (
            state: ProfileState,
            action: ProfileAction
        ) => {
            state.data = action.payload.data
        },
    },
})

export default profileSlice.reducer

export const getProfile = ({ profile }: { profile: ProfileState }) =>
    profile.data

export const { setSection, clearProfileState } = profileSlice.actions
