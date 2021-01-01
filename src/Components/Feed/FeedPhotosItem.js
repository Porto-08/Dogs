import React from 'react'
import Image from '../Helper/Image'
import styles from '../Modules.css/FeedPhotoItem.module.css'


const FeedPhotosItem = ({photo, setModalPhoto}) => {
    function hancleCLick() {
        setModalPhoto(photo)
    }
    
    return (
        <li className={styles.photo} onClick={hancleCLick}>
            <Image src={photo.src} alt={photo.title}/>
            <span className={styles.preview}>{photo.acessos}</span>
        </li>
    )
}

export default FeedPhotosItem
