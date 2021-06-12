import React from 'react';
import {Link} from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <Link to="/">Hlavni stranka</Link>
            <Link to="/add-material">Pridani materialu</Link>
        </div>
    )
}

export default Menu
