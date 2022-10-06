import { ReactElement } from 'react'

const FilePreviewItem = ({ url }: { url: string }): ReactElement => {
    return (
        <div className="file-input__preview-item">
            <img src={url} alt="your image preview" />
        </div>
    )
}

export default FilePreviewItem
