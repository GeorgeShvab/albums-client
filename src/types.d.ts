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
    | 'delete-photos'
    | 'move-photos'
    | 'add-photo'

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
    | 'album'

export interface User {
    _id: string
    name: string
    email: string
    role: 'user' | 'admin'
    lastVisit: string
    createdAt: string
    updatedAt: string
    avatar?: string
    description?: string
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

export interface FetchMeAction extends ThunkAction, AnyAction {
    payload: {
        success: boolean
        data: User
    }
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
    | 'delete-photos'
    | 'move-photos'
    | 'add-photo'

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
    creator: User
    count: number
    visibility: 'private' | 'public'
    last_photo?: Photo
    background?: string | null
    createdAt: string
    updatedAt: string
    _id: string
    saved: boolean
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

export interface Photo {
    name: string
    uploader: string
    album?: mongoose.Schema.Types.ObjectId
    visibility: 'private' | 'public'
    createdAt: string
    updatedAt: string
    _id: string
}

export interface PhotosState {
    status: Status
    data: null | Photo[]
}

export interface PhotosAction extends ThunkAction, AnyAction {
    payload: {
        data: Photo[]
        status: boolean
    }
}

export interface AlbumState {
    status: Status
    data: null | Album
}

export interface AlbumAction {
    payload: {
        data: Album
        status: boolean
    }
}

export interface SelectionModeState {
    state: boolean
    selected: string[]
}

export interface SelectAction extends AnyAction, ThunkAction {
    payload: string
}

export interface DeletePhotosAction extends AnyAction, ThunkAction {
    payload: {
        data: string[]
        success: boolean
    }
}

export interface MovePhotosAction extends AnyAction, ThunkAction {
    payload: {
        data: { photos: string[]; album: undefined | Album }
        success: boolean
    }
}

export interface SelectElement {
    func: () => void
    text: string
    value: string
    selected?: boolean
}

export interface DataListElement {
    text: string
    id: string
}

export interface ChangeNumberOfPhotosAction extends ThunkAction, AnyAction {
    payload: {
        albumId: string
        count: number
    }
}

export interface FullScreenState {
    state: boolean
    data: Photo | null
}

export interface FullScreenAction extends ThunkAction, AnyAction {
    payload: Photo
}

export interface AddPhotoFormEvent extends FormEvent<HTMLFormElement> {
    target: EventTarget &
        HTMLFormElement & {
            photos: HTMLInputElement
            albumName: HTMLInputElement
        }
}

export interface AddPhotoAction extends ThunkAction, AnyAction {
    payload: {
        photos: Photo[]
        album?: Album
    }
}

export interface Save {
    album: Album
    user: User
}

export interface UserProfileData extends User {
    saved: Save[]
    albums: Album[]
    section: 'albums' | 'saved'
}

export interface ProfileState {
    data: UserProfileData | null
    status: Status
}

export interface ProfileAction extends ThunkAction, AnyAction {
    payload: {
        success: boolean
        data: UserProfileData
    }
}

export interface GetProfileAction extends ThunkAction, AnyAction {
    payload: {
        success: boolean
        data: {}
    }
}
