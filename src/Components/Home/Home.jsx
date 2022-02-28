import { Formik } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux'
import { capitalize, getFood, nextPage, previousPage, searchRecipe } from '../../Redux/actions';
import Cards from '../Cartas/Cards/Cards';
import Menu from '../Menu/Menu';
import ModalInfo from '../Modals/ModalInfo/ModalInfo';
import Navbar from '../Common/Navbar/Navbar';
import './Home.css'

function Home() {

  const food = useSelector((state) => state.allFood)
  const page = useSelector((state) => state.page)
  const userToken = useSelector((state) => state.userToken)

  const [showModal, setShowModal] = useState(false)
  const [showRecipe, setShowRecipe] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem('logged')) { window.location.href = "http://localhost:3000/" }
    dispatch(getFood())
  }, [])

  function siguiente() {
    if (page / 6 < food.length / 6 - 1) {
      dispatch(nextPage())
    } else return page
  }

  return (
    <div className='bodyhome'>
      <Navbar />
      <ModalInfo showModal={showModal} setShowModal={setShowModal} showRecipe={showRecipe} />
      <Formik
        initialValues={{ text: '' }}
        validate={(valores) => {
          let errores = {}
          if (valores.text.length <= 2 && valores.text.length > 0) {
            errores.text = 'Debes poner mas de 2 caracteres'
          }
          return errores
        }}
        onSubmit={(valores) => {
          dispatch(searchRecipe(capitalize(valores.text)))
        }}
      >
        {({ handleChange, errors, touched, handleSubmit, handleBlur, values }) => (
          <form onSubmit={handleSubmit}>
            <h1>Que plato estas buscando?</h1>
            <div className='aa'>
              <input
              className='search-input'
              type='text'
              id='text'
              name='text'
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Ingresa nombre del plato'
            />
              <button className='Icon' type='submit'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></button>
            </div>
              {touched.text && errors.text && <div className='error'>{errors.text}</div>}
          </form>)}
      </Formik>
      <div className='container-button'>
        <button type="button" class="btn btn-outline-secondary" onClick={() => dispatch(previousPage())}>« Previous</button>
        <button type="button" class="btn btn-outline-secondary" onClick={siguiente}>Next »</button>
      </div>
      <div
        className='row-md container-fluid'>
        <Cards food={food.slice(page, page + 6)} setShowModal={setShowModal} setShowRecipe={setShowRecipe} />
      </div>
      <Menu />
    </div>
  )
}

export default Home
