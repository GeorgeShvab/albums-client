import React from 'react'
import ContentLoader from 'react-content-loader'

const AlbumHeading = (props: any) => (
    <ContentLoader
        speed={1}
        width={200}
        height={props.mobile ? '8.1rem' : '8.9rem'}
        viewBox="0 0 200 8.9rem"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect
            x="0"
            y="0"
            rx="5"
            ry="5"
            width="200"
            height={props.mobile ? '32' : '40'}
        />
        <rect
            x="45"
            y={props.mobile ? '60' : '74'}
            rx="2"
            ry="2"
            width="110"
            height={props.mobile ? '12' : '15'}
        />
        <rect
            x="55"
            y={props.mobile ? '42' : '54'}
            rx="2"
            ry="2"
            width="90"
            height={props.mobile ? '12' : '15'}
        />
    </ContentLoader>
)

export default AlbumHeading
