import { Action, AnyAction, Store } from '@reduxjs/toolkit'
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

export type MobileMenuType =
    | 'navigation'
    | 'adding'
    | 'add-album'
    | 'delete-album'
    | 'change-album-name'
    | 'change-album-visibility'
    | 'change-album-preview'

export interface MobileMenuState {
    state: boolean
    type: null | MobileMenuType
    data: any
}

export interface MobileMenuAction extends ThunkAction {
    payload: { type: MobileMenuType; data: any } | MobileMenuType
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
    type: null | WindowType
    data: any
}

export type WindowType =
    | 'add-album'
    | 'delete-album'
    | 'change-album-visibility'
    | 'change-album-name'
    | 'change-album-preview'

export interface WindowAction extends ThunkAction {
    payload: WindowType | { data: any; type: WindowType }
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
    last_photo?: Photo
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

export interface AlbumsAction extends ThunkAction, AnyAction {
    payload: {
        success: boolean
        data: Album[]
    }
}

export interface AlbumsActionOne extends ThunkAction, AnyAction {
    payload: {
        success: boolean
        data: Album
    }
}

export interface Photo {
    name: string
    uploader: string
    album?: string
    visibility: 'private' | 'public'
    last_photo: string
    createdAt: string
    updatedAt: string
}

export interface AlbumUpdateParams {
    albumId: string
    visibility?: 'private' | 'public'
    name?: string
}

export interface FileFormEvent extends FormEvent<HTMLFormElement> {
    target: EventTarget &
        HTMLFormElement & {
            background: HTMLInputElement
        }
}
