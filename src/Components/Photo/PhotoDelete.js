import React from 'react'
import { PHOTO_DELETE } from '../../API/api'
import useFetch from '../../Hooks/useFetch'
import styles from '../Modules.css/PhotoDelete.module.css'


const PhotoDelete = ({ id }) => {

    const { loading, request } = useFetch()

    async function handleClick() {
        const confirm = window.confirm('Tem certeza que deseja excluir?')
        if (confirm) {
            const { url, options } = PHOTO_DELETE(id)

            const { response } = await request(url, options)

            if (response.ok) {
                window.location.reload()
            }
        }

    }

    return (
        <>
            {loading 
            ? 
                <button onClick={handleClick} className={styles.delete}>
                    Deletando
                </button>
            :
                <button onClick={handleClick} className={styles.delete}>
                    Deletar
                </button>
            }

        </>
    )
}

export default PhotoDelete
