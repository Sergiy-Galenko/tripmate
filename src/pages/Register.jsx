import React from 'react';

const Register = () => {
  return (
    <div>
      <h2>Реєстрація</h2>
      <form>
        <input type="text" placeholder="Електронна пошта" />
        <input type="password" placeholder="Пароль" />
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;
