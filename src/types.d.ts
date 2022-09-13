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
}

export type Page = 'home' | 'photos' | 'albums' | 'settings' | 'add-photo'
