import React from 'react';
import validate from './Components/validateInfo';
import useForm from './Components/useForm';
import '../bootstrap.min.css'
import '../styles.css';

const Login = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(submitForm, validate);

  return (
    <div className="login">
        <div className='form-content-right'>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1 className="title">Bienvenido de vuelta!</h1>
                <div className='form-inputs'>
                <input className='form-input' type='text' name='username' placeholder='Ingresa tu usuario' value={values.username} onChange={handleChange}/>
                {errors.username && <p className="p-user">{errors.username}</p>}
                </div>
                <div className='form-inputs'>            
                <input className='form-input' type='password' name='password' placeholder='Ingresa tu contraseña' value={values.password} onChange={handleChange}/>
                {errors.password && <p className="p-pass">{errors.password}</p>}
                </div>
                <button className='btn btn-primary' type='submit'>Iniciar sesión</button>
                <span className='form-input-login'>
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </span>
            </form>
        </div>
    </div>
  );
};

export default Login;