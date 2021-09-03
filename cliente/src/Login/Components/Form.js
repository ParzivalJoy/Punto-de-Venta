import React, {useState} from 'react';
import Login from '../Login';
import '../../bootstrap.min.css'
import '../../styles.css';


const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm(){
        setIsSubmitted(true);
    }
    return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
        </div>
        <Login/>
      </div>
    </>
  );
};

export default Form
