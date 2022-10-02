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
        <rect x="0" y="0" rx="5" ry="5" width="200" height="40" />
        <rect x="45" y="74" rx="2" ry="2" width="110" height="15" />
        <rect x="55" y="54" rx="2" ry="2" width="90" height="15" />
    </ContentLoader>
)

export default AlbumHeading
