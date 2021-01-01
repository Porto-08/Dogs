import React from 'react'
import UserheaderNav from './UserheaderNav'
import styles from '../Modules.css/UserHeader.module.css'
import { useLocation } from 'react-router-dom'


const UserHeader = () => {

    const [title, setTitle] = React.useState('')
    const location = useLocation()

    React.useEffect(() => {
        if('/account' === location.pathname){
            setTitle('Minha Conta')
        }
        if('/account/statistics' === location.pathname){
            setTitle('Estatísticas')
        }
        if('/account/post' === location.pathname){
            setTitle('Nova Foto')
        }
    }, [location])

    return (
        <header className={styles.header}>
            <h1 className='title'>{title}</h1>
            <UserheaderNav />
        </header>
    )
}

export default UserHeader
