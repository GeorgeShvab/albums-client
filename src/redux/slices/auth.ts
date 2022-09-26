import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
    AuthAction,
    AuthResponseData,
    AuthServerResponse,
    AuthState,
    FetchMeAction,
    LogBody,
    RegBody,
} from '../../types'
import axios from '../../axios'
import axiosInstance from '../../axios'

export const fetchLog = createAsyncThunk(
    'auth/fetchLog',
    async (body: LogBody, { rejectWithValue }) => {
        try {
            const data = await axios.post('/login', body)

            return data.data
        } catch (e: any) {
            if (!e.response) {
                throw e
            }
            return rejectWithValue(e.response.data)
        }
    }
)

export const fetchReg = createAsyncThunk(
    'auth/fetchReg',
    async (body: RegBody, { rejectWithValue }) => {
        try {
            const data = await axios.post('/registration', body)

            return data.data
        } catch (e: any) {
            if (!e.response) {
                throw e
            }
            return rejectWithValue(e.response.data)
        }
    }
)

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
    try {
        const data = await axios.get('/me')

        return data.data
    } catch (e: any) {
        if (!e.response) {
            throw e
        }

        const refresh =
            localStorage.getItem('Refresh') || localStorage.getItem('refresh')

        if (e.response.data?.errors.msg === 'token expired' && refresh) {
            console.log('token definetly expired')
            const newTokens = await axios.get('/token', {
                headers: { Refresh: refresh },
            })

            localStorage.setItem('Refresh', newTokens.data.data.refreshToken)
            localStorage.setItem('Authorization', newTokens.data.data.authToken)

            const data = await axios.get('/me', {
                headers: {
                    Authorization: newTokens.data.data.authToken,
                },
            })

            return data.data
        }

        throw e
    }
})

const initialState: AuthState = {
    data: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLog.pending.type]: (state: AuthState) => {
            state.status = 'loading'
        },
        [fetchLog.fulfilled.type]: (state: AuthState, action: AuthAction) => {
            state.status = 'loaded'
            state.data = action.payload.data.user
            localStorage.setItem('Authorization', action.payload.data.authToken)
            localStorage.setItem('Refresh', action.payload.data.refreshToken)
        },
        [fetchLog.rejected.type]: (state: AuthState) => {
            state.status = 'error'
        },
        [fetchReg.pending.type]: (state: AuthState) => {
            state.status = 'loading'
        },
        [fetchReg.fulfilled.type]: (state: AuthState, action: AuthAction) => {
            state.status = 'loaded'
            state.data = action.payload.data.user
            localStorage.setItem('Authorization', action.payload.data.authToken)
            localStorage.setItem('Refresh', action.payload.data.refreshToken)
        },
        [fetchReg.rejected.type]: (state: AuthState) => {
            state.status = 'error'
        },
        [fetchMe.pending.type]: (state: AuthState) => {
            state.status = 'loading'
        },
        [fetchMe.fulfilled.type]: (state: AuthState, action: FetchMeAction) => {
            state.status = 'loaded'
            state.data = action.payload.data
        },
        [fetchMe.rejected.type]: (state: AuthState) => {
            state.status = 'error'
        },
    },
})

export const getUser = ({ auth }: { auth: AuthState }) => auth

export const isAuthorized = ({ auth }: { auth: AuthState }) =>
    Boolean(auth.data)

export default authSlice.reducer
