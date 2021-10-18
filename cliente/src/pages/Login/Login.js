import {React, useState } from 'react';
import '../../styles.scss';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com' //npm i emailjs-com
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import{ init } from 'emailjs-com';
init("user_vE01873KnIdtHQnqhpb3Q");
const baseURL = process.env.REACT_APP_API_URL

const Login = () => {

  let history = useHistory();
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [msg, setMsg]=useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setMsg('')
    setUsername('')
  };
  const handleShow = () => setShow(true);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  function validateInfo(data) {
    let error={msg:'', type:0}
    if (values.username==''||values.password=='') {
      error.msg= 'Por favor llene ambos campos.'
      error.type=1
    }
    if (data==0){
      error.msg='El password o contraseña son inválidos, vuelva a intentar de nuevo.'
      error.type=2
    }
    return error;
  }
  function sendEmail(){
    emailjs.send('service_vvmlhv5','template_80673b6',{ email: email,
      message: "Tu contraseña es: "+ password,
      name: name}, 'user_vE01873KnIdtHQnqhpb3Q', )
		.then((response) => {
				   console.log('SUCCESS!', response.status, response.text);
           setMsg('La contraseña ha sido enviada a tu email')
		}, (err) => {
				   console.log('FAILED...', err);
           setMsg('No se pudo enviar la contraseña a tu email, intenta de nuevo')
		});
  }

  async function getEmailUser(){
    const obj = {username}
    const {data} = await axios.post(baseURL+'/userEmail',obj)
    console.log(data)
    if(data=='0'){
      setMsg('El usuario no se encuentra registrado')
    }
    else{
      console.log(data.emailempleado)
      setPassword(data.contrasena)
      setEmail(data.emailempleado)
      setName(data.nombreempleado)
      sendEmail()
    }
  }

  async function handleClick(e){
    e.preventDefault()

    setErrors(validateInfo(1));
    const error= validateInfo(1)  
    if (error.type===0)
    {
      const {data}= await axios.post(baseURL+'/login', values)
      if (data!=0)
      {
        localStorage.setItem("user", data.nombreempleado)
        localStorage.setItem('role',data.nombrecargo)
        localStorage.setItem('token',data.access_token)
        history.push("/dashboard");
      }else
      {
        setErrors(validateInfo(0));
      }
    }
  }


  return (
    <div className="login">
        <div className='form-content-right'>
            <form  className='form' onSubmit={handleClick}>
                <h1 className="title">Bienvenido de vuelta!</h1>
                <span className="subtitle">Que tengas un excelente día</span>
                <div className='form-inputs'>
                <input className='form-input' type='text' name='username' placeholder='Ingresa tu usuario' onChange={handleChange }/>
                </div>
                <div className='form-inputs'>
                <input className='form-input' type='password' name='password' placeholder='Ingresa tu contraseña' onChange={handleChange} />
                {errors.msg && <p className="p-pass">{errors.msg}</p>}
                </div>
                <button className='btn btn-primary' type='submit'>Iniciar sesión</button>
                <br/><br/>
                <span className='form-input-login'>
                    <a href='#' onClick={handleShow} align='center'>¿Olvidaste tu contraseña?</a>
                </span>
            </form>
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>

        <Modal.Header>
            <Modal.Title><b>Restaurar contraseña </b></Modal.Title>
        </Modal.Header>
        <form id="formLink"> 
        <Modal.Body>
            <div className="row">
                <div className="col-lg-12">
                <div className="form-group" align="center">
                  <div >
                      <label className="col-form-label"><b> Ingrese su usuario:</b></label>
                      <input type="text" className="form-control" value={username} onChange={ e=> setUsername(e.target.value)}/>
                        <br/>
                        {msg && <p>{msg}</p>}
                  </div>
                </div>
                </div>
            </div>   
        </Modal.Body>
        </form>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" onClick={getEmailUser}>Enviar</Button>
        </Modal.Footer>
        </Modal>
    </div>
    
  );
};

export default Login;