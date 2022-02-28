import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { centaveToDolar, menuStats } from '../../../Redux/actions'
import './ModalMenu.css'

function ModalMenu({ showInfoMenu, setShowInfoMenu }) {

    const [realMenu, setRealMenu] = useState({ price: '', time: '' })
    const menu = useSelector((state) => state.menu)

    useEffect(() => {
        menu.length > 0 && setRealMenu(menuStats(menu))
    }, [menu])

    return (
        <div >
            {showInfoMenu &&
                menu.map((e, index) =>
                    <div className='modalcontainer' key={index} >
                        <motion.div
                            className='modalinfo'
                        >
                            <div className='modalmenubody'>
                                <button onClick={() => setShowInfoMenu(false)} className='close-modal'>X</button>
                                <div className='infomenu-container'>
                                    <h1 className='tumenu'>Tu menú</h1>
                                    <div className='info-row'>
                                        <img className='logos-veggie' src={require('../../../images/puntosdesalud.png')} />
                                        <label>{realMenu.healthScore} pts</label>
                                        <img className='logos-veggie' src={require('../../../images/tiempo.png')} />
                                        <label>{realMenu.time} min</label>
                                        <img className='logos-veggie' src={require('../../../images/precio.png')} />
                                        <label>${centaveToDolar(realMenu.price)}</label>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>)}
        </div>
    )
}

export default ModalMenu