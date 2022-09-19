import { Store } from '@reduxjs/toolkit'
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
    type: null | 'navigation' | 'adding' | 'add-album'
}

export interface MobileMenuAction extends ThunkAction {
    payload: null | 'navigation' | 'adding' | 'add-album'
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

export interface WindowState {
    state: boolean
    type: null | 'add-album'
}

export interface WindowAction extends ThunkAction {
    payload: 'add-album'
}

export interface AddAlbumFormEvent extends FormEvent<HTMLFormElement> {
    target: EventTarget & {
        name: HTMLInputElement
        visibility: HTMLInputElement
    }
}

export interface Album {
    name: string
    creator: string
    count: number
    visibility: 'private' | 'public'
    last_photo?: string
    background?: string
    createdAt: string
    updatedAt: string
    _id: string
}

export interface AlbumsState {
    status: Status
    data: Album[] | null
}

export interface CustomStore extends Store {
    auth: AuthState
    albums: AlbumsState
    device: DeviceState
    mobileMenu: MobileMenuState
    page: PageState
    overlay: OverlayState
    window: WindowStates
}

export interface AlbumsAction extends ThunkAction {
    payload: {
        success: boolean
        data: Album[]
    }
}

export interface AlbumsActionOne extends ThunkAction {
    payload: {
        success: boolean
        data: Album
    }
}
