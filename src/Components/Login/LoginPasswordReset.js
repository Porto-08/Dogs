import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../API/api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const { error, loading, request } = useFetch();
  const { login, setLogin } = React.useState("");
  const { key, setKey } = React.useState("");
  const password = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) {
        navigate("/login");
      }
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Reseta Senha'/>
      <h1 className="title">Escreva sua nova Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? <Button>Resetando...</Button> : <Button>Resetar</Button>}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
