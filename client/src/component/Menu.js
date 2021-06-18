import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../context/GlobalContext';

const Menu = () => {
    const {saveMaterial} = useContext(GlobalContext);
    return (
        <div className='bt bb tc mw7 center mt4"'>
            <Link class="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" to="/" >Hlavni stranka</Link>
            <Link class="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" to="/add-recipe">Přidej drink</Link>
            <Link class="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" to="/pridej-surovinu">Přidej surovinu</Link>
            <Link class="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" to="/seznam-drinku">Seznam drinků</Link>
            
            
            
            <div>{saveMaterial}</div>
        </div>
    )
}

export default Menu
