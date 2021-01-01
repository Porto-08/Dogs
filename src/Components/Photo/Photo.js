import React from 'react'
import { useParams } from 'react-router-dom'
import { PHOTO_GETS } from '../../API/api'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import Head from '../Helper/Head'
import Loading from '../Helper/Loading'
import PhotoContent from './PhotoContent'

const Photo = () => {
    const {id} = useParams()
    
    const {data, loading, error, request } = useFetch()

    React.useEffect(() => {
        const {url, options} = PHOTO_GETS(id)
        request(url, options)
    }, [id, request])

    if(error) return <Error /> 
    if(loading) return <Loading /> 
    if(data) return (
        <section className='container mainContainer'>
            <Head title='Foto'/>
            <PhotoContent single={true} data={data} />
        </section>
    )
    else return null
}

export default Photo
