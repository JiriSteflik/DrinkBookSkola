import React from 'react';
import '../App.css';


const SearchDrink = () => {
  return (
    <div>
        <p className='center f3 '>
            {'Tady si můžeš vyhledat svůj oblíbený drink'}
        </p>
        <div className='center '>
            <div className='form center pa4 br3 shadow-5 '>
                <input className='f4 pa2 w-70 center ' type='tex' />
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' >Najdi</button>
            </div>
        </div>
    </div>
  );
}

export default SearchDrink;