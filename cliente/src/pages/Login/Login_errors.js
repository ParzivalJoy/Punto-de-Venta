import React, {useEffect, useState } from 'react';
import validate from './Components/validateInfo';
import useForm from './Components/useForm';
import '../styles.scss';

const Login = ({submitForm}, props) => {
const { handleChange, handleSubmit, values, errors } = useForm(submitForm, validate);

  return (
    <div className="login">
        <div className='form-content-right'>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1 className="title">Bienvenido de vuelta!</h1>
                <span className="subtitle">Que tengas un excelente día</span>
                <div className='form-inputs'>
                <input className='form-input' type='text' name='username' placeholder='Ingresa tu usuario' onChange={ e=> props.set(e.target.value)}/>
                {errors.username && <p className="p-user">{errors.username}</p>}
                </div>
                <div className='form-inputs'>            
                <input className='form-input' type='password' name='password' placeholder='Ingresa tu contraseña' onChange={ e=> props.setPass(e.target.value)}/>
                {errors.password && <p className="p-pass">{errors.password}</p>}
                </div>
                <button className='btn btn-primary' type='submit' onClick={props.verifyLogin}>Iniciar sesión</button>
                <span className='form-input-login'>
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </span>
                
            </form>
        </div>
    </div>
  );
};

export default Login;