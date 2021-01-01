import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../Context/UserContext";

import style from "../Modules.css/Login.module.css";
import NotFound from "../NotFound";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) {
    return <Navigate to="/account" />;
  }
  return (
    <section className={style.login}>
      <div className={style.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="lose" element={<LoginPasswordLost />} />
          <Route path="reset" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
