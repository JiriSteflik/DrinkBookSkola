import React from 'react';
import {Link} from 'react-router-dom';


const Menu = () => {
    
    return (
        <div className='bt bb tc mw7 center mt4"'>
            <Link className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to="/" >Hlavni stranka</Link>
            <Link className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" to="/add-recipe">Přidej drink</Link>
            <Link className="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" to="/pridej-surovinu">Přidej surovinu</Link>
            <Link className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" to="/seznam-drinku">Seznam drinků</Link>
            
            
            
            
        </div>
    )
}

export default Menu
