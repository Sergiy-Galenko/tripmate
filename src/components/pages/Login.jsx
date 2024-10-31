// src/pages/Login.jsx
import React from 'react';

const Login = () => {
  return (
    <div>
      <h2>Вхід</h2>
      <form>
        <input type="text" placeholder="Електронна пошта" />
        <input type="password" placeholder="Пароль" />
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;
