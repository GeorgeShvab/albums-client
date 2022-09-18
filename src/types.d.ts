import { FormEvent } from 'react'
import { ThunkAction } from 'redux-thunk'

export interface DeviceState {
    isMobile: boolean
}

export interface PageState {
    page: Page
}

export interface OverlayState {
    state: boolean
}

export interface MobileMenuState {
    state: boolean
    type: null | 'navigation' | 'adding'
}

export interface MobileMenuAction extends ThunkAction {
    payload: null | 'navigation' | 'adding'
}

export type Page =
    | 'home'
    | 'photos'
    | 'albums'
    | 'settings'
    | 'add-photo'
    | 'login'
    | 'registration'

export interface User {
    _id: string
    name: string
    email: string
    role: 'user' | 'admin'
    lastVisit: string
    createdAt: string
    updatedAt: string
}

export type Status = 'loading' | 'loaded' | 'error'

export interface AuthState {
    data: User | null
    status: Status
}

export interface AuthServerResponse {
    success: boolean
    data: AuthResponseData
}

export interface AuthResponseData {
    user: User
    refreshToken: string
    authToken: string
}

export interface LogBody {
    password: string
    email: string
}

export interface RegBody {
    password: string
    email: string
    name: string
}

export interface AuthAction extends ThunkAction {
    payload: AuthServerResponse
}

export interface LoginFormEvent extends FormEvent<HTMLFormElement> {
    target: EventTarget & {
        email: HTMLInputElement
        password: HTMLInputElement
    }
}

export interface RegFormEvent extends FormEvent<HTMLFormElement> {
    target: EventTarget & {
        email: HTMLInputElement
        password: HTMLInputElement
        name: HTMLInputElement
    }
}
