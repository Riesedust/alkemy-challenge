import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { centaveToDolar, deleteMenu, removeVegan } from '../../Redux/actions';
import ModalMenu from '../Modals/ModalMenu/ModalMenu';

import './Menu.css'

function Menu() {

  const [showInfoMenu, setShowInfoMenu] = useState(false)
  const menu = useSelector((state) => state.menu)
  const dispatch = useDispatch()

  return (
    <div className='container-fluid'>
      <ModalMenu showInfoMenu={showInfoMenu} setShowInfoMenu={setShowInfoMenu} />
      <h1>Crea tu menú!</h1>
      <div className='container-fluid'>
        {menu.length > 0 ?
          <div className='row-md justify-content-center'>
            {menu.map(food =>
              <div className='menu-card container' style={{ alignItems: 'center' }}>
                <button className='btn btn-danger' onClick={() => {
                  dispatch(deleteMenu(food.id))
                  dispatch(removeVegan(food.id))
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg></button>
                <div className='row align-items-center'>
                  <div className='col-5'>
                    <img src={food.image} className='card-img' />
                  </div>
                  <div className='col'>
                    <p className='food-title'>{food.title}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          :
          <h5>Agrega recetas haciendo click en el botón que se encuentra dentro de las tarjetas </h5>
        }
      </div>
      <button className='btn boton-modal' onClick={() => setShowInfoMenu(true)}>Ver acumulativos</button>
      
    </div>
  )
};

export default Menu;
