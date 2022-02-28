import React from 'react';
import { centaveToDolar } from '../../../Redux/actions'; 
import Card from '../Card/Card';
import './Cards.css'

function Cards({ food, setShowRecipe, setShowModal }) {


    return (food.map((e, index) =>
        <div
            className='card container' 
            onClick={() => {
                setShowRecipe(e)
                setShowModal(true)
            }}>
            <Card
                keyFood={index}
                idFood={e.id}
                title={e.title}
                image={e.image}
                vegan={e.vegan}
                price={centaveToDolar(e.pricePerServing)}
                glutenFree={e.glutenFree}
                vegetarian={e.vegetarian}
                healthScore={e.healthScore}
            />
        </div>
    ))
}

export default Cards;
