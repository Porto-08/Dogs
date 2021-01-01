import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST } from "../../API/api";
import Head from "../Helper/Head";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace("lose", "reset"),
      });
      const { json } = await request(url, options);
      console.log(json);
    }
  }

  return (
    <section className='animeLeft'>
      <Head title='Perdeu Senha'/>
      <h1 className="title"> Perdeu a senha? </h1>
      {data ? (
        <h3 className={{color: 'green'}}>{data}</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuario" type="text" name="login" {...login} />
          {loading ? (
            <Button>Enviando....</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
