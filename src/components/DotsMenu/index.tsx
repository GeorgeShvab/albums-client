import { ReactElement, useRef, useState } from 'react'
import { ContextMenuWrapper } from '..'
import useOutsideClick from '../../hooks/useOutsideClick'
import useOutsideHover from '../../hooks/useOutsideHover'
import ContextMenu from '../ContextMenu'
import './style.scss'

const DotsMenu = (props: {
    style?: any
    children: ReactElement
    hideContextMenuOnOutsideHover?: boolean
    type?: 'hover' | 'click'
}): ReactElement => {
    const btnEl = useRef<HTMLButtonElement | null>(null)

    return (
        <button className={`dots-menu`} style={props.style} ref={btnEl}>
            <span></span>
            <ContextMenuWrapper
                refEl={btnEl}
                type={props.type ? props.type : 'click'}
            >
                {props.children}
            </ContextMenuWrapper>
        </button>
    )
}

export default DotsMenu
