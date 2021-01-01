import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserHeader from './UserHeader'
import UserPhotoPost from './UserPhotoPost'
import Feed from '../Feed/Feed'
import UserStats from './UserStats'
import { UserContext } from '../../Context/UserContext'
import NotFound from '../NotFound'
import Head from '../Helper/Head'


const User = () => {

    const { data } = React.useContext(UserContext)

    return (
        <section className='container'>
            <Head title='Minha Conta'/>
            <UserHeader />
            <Routes>
                <Route path='/' element={<Feed user={data.id} />} />
                <Route path='post' element={<UserPhotoPost />} />
                <Route path='statistics' element={<UserStats />} />
                <Route path='*' element={<NotFound />} />

            </Routes>
        </section>
    )
}

export default User
