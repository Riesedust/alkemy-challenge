import { Formik } from 'formik';
import React from 'react';
import axios from 'axios';
import './Login.css'

function Login() {



  return (
   <div className='container'>
        <h1>Inicia sesion</h1>
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validate={(valores) => {
                let errores= {}
                if(!valores.email){
                    errores.email= 'Ingrese un correo válido'
                }
                if(!valores.password){
                    errores.password= 'Ingrese una contraseña válida'
                }
                return errores
            }}
            onSubmit={async (valores) =>{
                console.log(valores)
                await axios.post("http://challenge-react.alkemy.org/", valores)
                .then(response =>{
                    alert('Ingresó correctamente :)')
                    //me conviene agarrar el token acá y meterlo en un estado global por si alguien intenta entrar sin estar logueado
                    window.location.href = "http://localhost:3000/home"
                })
                .catch(error => {alert('Revise los datos ingresados')})
            }}
        >
            {({handleSubmit, errors, touched, handleBlur, handleChange, values}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Ingresa tu correo</label>
                        <input 
                            type='email'
                            id='email'
                            name='email' 
                            placeholder='correo@correo.com' 
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email && <div className='error'>{errors.email}</div>}
                    </div>
                    <div>
                        <label htmlFor='password'>Ingresa tu contraseña</label>
                        <input 
                            type='password'
                            id='password' 
                            name='password' 
                            placeholder='*******' 
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password && <div className='error'>{errors.password}</div>}                       
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
  </div>
)}

export default Login;
