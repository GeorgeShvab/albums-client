import React from 'react'
import ContentLoader from 'react-content-loader'

const AlbumHeading = (props: any) => (
    <ContentLoader
        speed={1}
        width={200}
        height={'8.9rem'}
        viewBox="0 0 200 89"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="5" ry="5" width="200" height="32" />
        <rect x="55" y="42" rx="2" ry="2" width="90" height="18" />
        <rect x="45" y="67" rx="2" ry="2" width="110" height="18" />
    </ContentLoader>
)

export default AlbumHeading
