import React, {useState, useContext} from 'react';
import '../App.css';

import {GlobalContext} from "../context/GlobalContext";
import {useHistory} from "react-router-dom";
const SearchDrink = () => {
    const route = useHistory();
    const {setVyhledaneRecepty} = useContext(GlobalContext);
    const [searchField, setSearchField] = useState("");
    
    const submit = () => {
        if(searchField.length>2){
            
        fetch("http://localhost:7000/get-receipt", {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fullText:searchField.toLowerCase()})})
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setVyhledaneRecepty(data);
            setSearchField("");
            route.push("/search-engine-result-page");
        })
        .catch((err) => {
            if(err){
                setVyhledaneRecepty({
                    msg:"",
                    data:[]
                })
            }
        })
    }
    
    }



  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      submit();
  }}>
        <p className='center f3 '>
            {'Tady si můžeš vyhledat svůj oblíbený drink'}
        </p>
        <div className='center '>
            <div className='form center pa4 br3 shadow-5 '>
                <input className='f4 pa2 w-70 center' type='text' onInput={(e) => {

                setSearchField(e.target.value)

                }} value={searchField}/>
                <input type="submit" className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' value="najdi"/>
            </div>
        </div>
    </form>
  );
}

export default SearchDrink;