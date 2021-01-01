import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import { UserContext } from '../../Context/UserContext'
import Error from '../Helper/Error'
import styles from '../Modules.css/LoginForm.module.css'
import stylesBtn from '../Modules.css/Button.module.css'
import Head from '../Helper/Head'

const LoginForm = () => {

    const username = useForm()
    const password = useForm()

    const {userLogin, error, loading} = React.useContext(UserContext)

    async function handleSubmit(event) {
        event.preventDefault()
        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value)
        }
    }

    return (
        <section className='animeLeft'>
            <Head title='Login'/>
            <h1 className='title'>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label='Usuario' type='text' name='username' {...username} />
                <Input label='Senha' type='password' name='password' {...password} />
                {loading ? 
                    <Button disable>Carregando...</Button> 
                : 
                    <Button>Entrar</Button>
                }
                <Error error={error}/>
            </form>
            <Link className={styles.lost} to='/login/lose'>Perdeu a senha?</Link>
            <div className={styles.create}>
                <h2 className={styles.subtitle}>cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site!</p>
                <Link className={stylesBtn.button} to='/login/create'>Cadastro</Link>
            </div>
        </section>
    )
}

export default LoginForm
