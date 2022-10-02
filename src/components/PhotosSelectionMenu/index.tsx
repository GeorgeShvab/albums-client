import { ReactElement } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { deactivateSelectionMode } from '../../redux/slices/selectionMode'
import { BtnRow } from '../'
import './style.scss'

const PhotosSelectionMenu = (): ReactElement => {
    const dispatch = useAppDispatch()

    const handleDeleteClick = () => {}

    const handleReplaceClick = () => {}

    const handleCancelClick = () => {
        dispatch(deactivateSelectionMode())
    }

    const elements = [
        {
            func: () => {
                console.log('heheh')
            },
            text: 'Перемістити',
        },
        {
            func: () => {
                console.log('heheh')
            },
            text: 'Видалити',
            style: { background: '#EA5C48', border: '2px solid #EA5C48' },
        },
        {
            func: () => {
                console.log('heheh')
            },
            text: 'Відмінити',
        },
    ]

    return (
        <div className="photos-selection">
            <BtnRow elements={elements} />
        </div>
    )
}

export default PhotosSelectionMenu
