import React from 'react'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import { PHOTO_GET } from '../../API/api'
import useFetch from '../../Hooks/useFetch'
import styles from '../Modules.css/FeedModal.module.css'
import PhotoContent from '../Photo/PhotoContent'


const FeedModal = ({photo, setModalPhoto}) => {

    const {data, error, loading, request} = useFetch()

    React.useEffect(() => {
        const {url, options} = PHOTO_GET(photo.id)
        request(url, options)
    }, [photo, request])

    function handleOutsideClick({target, currentTarget}) {
        if(target === currentTarget) {
            setModalPhoto(null)
        }
    }

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            {error && <Error error={error}/>}
            {loading && <Loading />}
            {data && <PhotoContent data={data}/>}
        </div>
    )
}

export default FeedModal
