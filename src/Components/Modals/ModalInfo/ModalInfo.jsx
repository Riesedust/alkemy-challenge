import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ModalInfo.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addMenu, centaveToDolar, isVegan } from '../../../Redux/actions'


function ModalInfo({ showModal, setShowModal, showRecipe }) {

    const menu = useSelector((state) => state.menu)
    const vegano = useSelector((state) => state.isVegan)
    const noVegano = useSelector((state) => state.notVegan)
    const dispatch = useDispatch()

    function handleClick(e) {
        if (menu.length < 4) {
            if (menu.some(j => j.title === e.title) === true) {
                return alert('Este plato ya está en el menú')
            }
            else {
                if (e.vegan === true) {
                    if (vegano.length > 1) {
                        return alert('Solo se permiten 2 comidas veganas en tu menú')
                    } else
                        dispatch(isVegan(e))
                    dispatch(addMenu(e))
                    setShowModal(false)
                }
                else if (e.vegan === false) {
                    if (noVegano.length > 1) {
                        return alert('Solo se permiten 2 comidas no veganas en tu menú')
                    } else
                        dispatch(isVegan(e))
                    dispatch(addMenu(e))
                    setShowModal(false)
                }
            }
        }
        else {
            alert('El menú está lleno')
        }
    }


    return (
        <AnimatePresence >
            {showModal &&
                <div className='modalcontainer'>
                    <motion.div
                        className='modalinfo'
                    >
                        <div className='modalbody'>
                            <button onClick={() => setShowModal(false)} className='close-modal'>X</button>
                            <img src={showRecipe.image} className='modal-img' />
                            <div className='info-container p-3'>
                                <h5>{showRecipe.title}</h5>
                                <h6 className='price'>${centaveToDolar(showRecipe.pricePerServing)}</h6>
                                <div className='info-row'>
                                    <img className='logos-veggie' src={require('../../../images/puntosdesalud.png')} />
                                    <label>{showRecipe.healthScore} pts</label>
                                    <img className='logos-veggie' src={require('../../../images/tiempo.png')} />
                                    <p>{showRecipe.readyInMinutes} min</p>
                                    <img className='logos-veggie' src={require('../../../images/personas.png')} />
                                    <p>{showRecipe.servings} per.</p>
                                </div>
                                <div className='card-cuerpo'>
                                    {showRecipe.glutenFree === true && <img className="logos-veggie" src={require('../../../images/glutenfree-logo.png')} />}
                                    {showRecipe.vegetarian === true && <img className="logos-veggie" src={require('../../../images/vegetarian-logo.png')} />}
                                    {showRecipe.vegan === true && <img className="logos-veggie" src={require('../../../images/vegan-logo.png')} />}
                                </div>
                                <button className='btn agregar-menu' onClick={() => handleClick(showRecipe)}>Agregar al menu</button>
                            </div>
                        </div>

                    </motion.div>
                </div>}
        </AnimatePresence>
    )
}

export default ModalInfo