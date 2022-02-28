import React from 'react';
import './Card.css'

function Card({title, image, healthScore, vegan, vegetarian, glutenFree, price }) {
  return(
      <div
        className='row align-items-center'
      >
        <div className='col-5'>
          <img className='card-img food-img' src={image} />
        </div>
        <div className='col'>
          
          <h6 className='title'>{title}</h6>
          <p>${price}</p>
          <p>Puntos de salud: {healthScore}</p>
          <div className='card-cuerpo'>
            {glutenFree === true && <img className="logos-veggie" src={require('../../../images/glutenfree-logo.png')} />}
            {vegetarian === true && <img className="logos-veggie" src={require('../../../images/vegetarian-logo.png')} />}
            {vegan === true && <img className="logos-veggie" src={require('../../../images/vegan-logo.png')} />}
          </div>
        </div>
      </div>
)}

export default Card;
