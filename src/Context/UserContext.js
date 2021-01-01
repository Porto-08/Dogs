import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../API/api'
import { useNavigate } from 'react-router-dom'


export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()


    const userLogout = React.useCallback(async function () {
            // resetando todos os valores
            setData(null)
            setError(null)
            setLoading(false)
            setLogin(null)
            window.localStorage.removeItem('token')
            navigate('/login')
        }, [navigate],
    )



    // Pegando os dados do usuario logado
    async function getUser(token) {
        // puxando a api de login
        const { url, options } = USER_GET(token)
        // pegando os dados
        const response = await fetch(url, options)
        const json = await response.json()

        //coloando os dados em uma constante como obj
        setData(json)
        // colocando como existe alguem logado
        setLogin(true)
    }

    async function userLogin(username, password) {
        // puxando a api de Logar o usuario
        try {
            setError(null)
            setLoading(true)

            const { url, options } = TOKEN_POST({ username, password })

            // enviando os dados na api para logar
            const tokenRes = await fetch(url, options)

            // Se não existir usuario
            if (!tokenRes.ok) {
                throw new Error(`Usuario inválido! Tente novamente. `)
            }

            // pegando o token
            const { token } = await tokenRes.json()

            // colocando o token no localStorage do Browser
            window.localStorage.setItem('token', token)

            // chamando a função de pegar o token e os dados do usuario
            await getUser(token)
            navigate('/account')
        } catch (err) {
            setError(err.message)
            setLogin(false)
        } finally {
            setLoading(false)
        }

    }

    // Efeito para login automatico
    React.useEffect(() => {
        async function autoLogin() {
            // pegando token do localStorage
            const token = window.localStorage.getItem('token')
            // se existir esse token
            if (token) {
                try {
                    setError(null)
                    setLoading(true)

                    // puxando api de validação do token
                    const { url, options } = TOKEN_VALIDATE_POST(token)

                    // validando token
                    const response = await fetch(url, options)

                    // se o token for invalido
                    if (!response.ok) {
                        throw new Error('Token invalido')
                    }

                    // se nao, faça o login e pegue os dados do usuario
                    await getUser(token)
                }
                catch (err) {
                    userLogout()
                }
                finally {
                    setLoading(false)
                }
            } else {
                setLogin(false)
            }

        }
        autoLogin()
    }, [userLogout])


    return (
        <UserContext.Provider value={{ userLogin, userLogout, loading, login, error, data }}>
            {children}
        </UserContext.Provider>
    )
}


