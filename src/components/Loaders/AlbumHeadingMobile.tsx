import ContentLoader from 'react-content-loader'

const AlbumHeadingMobile = (props: any) => (
    <ContentLoader
        speed={1}
        width={200}
        height={73}
        viewBox="0 0 200 73"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="5" ry="5" width="200" height="32" />
        <rect x="45" y="60" rx="2" ry="2" width="110" height="12" />
        <rect x="55" y="40" rx="2" ry="2" width="90" height="12" />
    </ContentLoader>
)

export default AlbumHeadingMobile
