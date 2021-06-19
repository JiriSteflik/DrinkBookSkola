import React from 'react';
import Tilt from 'react-parallax-tilt';
import wine from './wine.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0 ph3 pa4 '>
        
      <Tilt className="Tilt br2 shadow-2 center" options={{ max : 55 }} style={{ height: 270, width: 270 }} >
        <div className="Tilt-inner pa3">
          <h1 className='tc'>cocktail app</h1>
          <img className='image'  alt='logo' src={wine}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
