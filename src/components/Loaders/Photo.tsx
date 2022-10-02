import React from 'react'
import ContentLoader from 'react-content-loader'

const PhotoLoader = (props: any) => (
    <ContentLoader
        speed={1}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 150 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="8" ry="8" width="150" height="150" />
    </ContentLoader>
)

export default PhotoLoader
