import { Formik } from 'formik';
import React, { useEffect } from 'react';
import axios from 'axios';
import './Login.css'
import { useSelector } from 'react-redux';

function Login() {

    const menu = useSelector((state) => state.menu)

    useEffect(() => {
        if(localStorage.getItem('logged')){window.location.href = 'http://localhost:3000/home'}
    },[])



    return (
        <div className='login-body'>
            <div className='background-image'>
                <div className='container login-box'>
                    <h1>Inicia sesion</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validate={(valores) => {
                            let errores = {}
                            if (!valores.email) {
                                errores.email = 'Ingrese un correo válido'
                            }
                            if (!valores.password) {
                                errores.password = 'Ingrese una contraseña válida'
                            }
                            return errores
                        }}
                        onSubmit={async (valores) => {
                            await axios.post("http://challenge-react.alkemy.org/", valores)
                                .then(response => {
                                    alert('Ingresó correctamente :)')
                                    window.localStorage.setItem(
                                        'logged', JSON.stringify(response.data)
                                    )
                                    window.location.href = "http://localhost:3000/home"
                                })
                                .catch(error => {
                                    alert('Revise los datos ingresados')
                                })
                        }}
                    >
                        {({ handleSubmit, errors, touched, handleBlur, handleChange, values }) => (
                            <form onSubmit={handleSubmit} className='form-container'>
                                <div className='input-container'>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='Email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                    />
                                    {touched.email && errors.email && <div className='error'>{errors.email}</div>}
                                </div>
                                <div className='input-container'>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        placeholder='Password'
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                    />
                                    {touched.password && errors.password && <div className='error'>{errors.password}</div>}
                                </div>
                                <button type="submit" className='btn login-button'>Login</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login;
