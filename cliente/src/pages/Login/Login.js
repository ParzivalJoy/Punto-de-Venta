import React, {useEffect, useState } from 'react';
import validate from './Components/validateInfo';
import useForm from './Components/useForm';
import '../../styles.scss';
import axios from 'axios'

  const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = sessionStorage.getItem("token")
    console.log ("This is your token", token)

    async function handleClick(){
      const obj = {username, password}
      const {data} = await axios.post('http://localhost:5000/api/token', obj)
      sessionStorage.setItem("token", data.access_token)
    }
  return (
    <div className="login">
        <div className='form-content-right'>
            <form className='form'>
                <h1 className="title">Bienvenido de vuelta!</h1>
                <span className="subtitle">Que tengas un excelente día</span>
                <div className='form-inputs'>
                <input className='form-input' type='text' name='username' placeholder='Ingresa tu usuario' onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='form-inputs'>            
                <input className='form-input' type='password' name='password' placeholder='Ingresa tu contraseña' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='btn btn-primary' type='submit' onClick={handleClick}>Iniciar sesión</button>
                <span className='form-input-login'>
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </span>
            </form>
        </div>
    </div>
  );
};

export default Login;