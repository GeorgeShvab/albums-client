import { Album } from '../types'

const getNewAlbumName = (albums: Album[]): string => {
    const numbers: (string | number)[] = albums
        .map((item) => {
            const numstring = item.name.replace(/^Новий альбом /g, '')
            if (
                !isNaN(Number(numstring)) &&
                !/ /.test(numstring) &&
                numstring !== ''
            ) {
                return Number(numstring)
            }
            return numstring
        })
        .filter((item) => typeof item === 'number')

    let newAlbumName = ''

    for (let i = 1; i < numbers.length + 5; i++) {
        if (!numbers.includes(i)) {
            newAlbumName = 'Новий альбом ' + i
            break
        }
    }

    return newAlbumName
}
export default getNewAlbumName
