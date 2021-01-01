import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Image from '../Helper/Image'
import styles from '../Modules.css/PhotoContent.module.css'
import PhotoComments from './PhotoComments'
import PhotoDelete from './PhotoDelete'


const PhotoContent = ({ data, single }) => {
    const { photo, comments } = data
    const user = React.useContext(UserContext)


    return (
        <div className={`${styles.photo} ${single ? styles.single : ''}`}>
            <div className={styles.img}>
                <Image src={photo.src} alt={photo.title}/>
            </div>
            <div className={styles.details}>
                <div>
                    <p className={styles.author}>
                        {user.data && user.data.username === photo.author 
                            ? 
                            <PhotoDelete id={photo.id} />
                            : 
                            <Link to={`/profile/${photo.author}`}>
                                @{photo.author}
                            </Link>
                        }
                        <span className={styles.preview}>{photo.acessos}</span>
                    </p>
                    <h1 className='title'>
                        <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
                    </h1>
                    <ul className={styles.attributes}>
                        <li>{photo.peso} Kg</li>
                        <li>{photo.idade} Ano(s)</li>
                    </ul>
                </div>
            </div>
            <PhotoComments single={single} id={photo.id} comments={comments} />
        </div>
    )
}

export default PhotoContent
