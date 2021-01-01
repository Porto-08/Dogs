import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import styles from '../Modules.css/LoginCreate.module.css'
import { USER_POST } from '../../API/api'
import { UserContext } from '../../Context/UserContext'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import Head from '../Helper/Head'


const LoginCreate = () => {
    const username = useForm()
    const email = useForm('email')
    const password = useForm()

    const { userLogin } = React.useContext(UserContext)
    const { loading, error, request } = useFetch()

    async function handleSubmit(event) {
        event.preventDefault()
        const { url, options } = USER_POST({
            username: username.value,
            email: email.value,
            password: password.value
        })

        const { response } = await request(url, options)
        if (response.ok) await userLogin(username.value, password.value)

    }

    return (
        <section className='animeLeft'>
            <Head title='Cadastro'/>
            <h1 className='title'>Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label='Usuario' type='text' name='username' {...username} />
                <Input label='Email' type='email' name='email' {...email} />
                <Input label='Senha' type='password' name='password' {...password} />
                {loading
                    ?
                    <Button disable='dusable'>Cadastrando...</Button>
                    :
                    <Button>Cadastrar</Button>
                }
                <Error error={error} />
            </form>
        </section>
    )
}

export default LoginCreate
