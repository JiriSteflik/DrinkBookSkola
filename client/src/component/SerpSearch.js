
import React, {useState, useContext} from 'react'

import {GlobalContext} from "../context/GlobalContext";
import {useHistory} from "react-router-dom"

const SerpSearch = () => {
    const {setVyhledaneRecepty, vyhledaneRecepty, setZvolenyRecept} = useContext(GlobalContext);
    const [searchField, setSearchField] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const route = useHistory();
    const submit = () => {
        if(searchField.length > 2){
            setErrMessage("")
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
            console.log(data);
            setSearchField("");
        })
        .catch((err) => {
            if(err){
                setVyhledaneRecepty({
                    msg:"",
                    data:[]
                })
            }
        })
    }else{setErrMessage("K vyhledání receptu je potřeba zadat alespoň 3 znaky")}
    }
    return (
        <>
        
        <form onSubmit={(e) => {
            e.preventDefault()
            submit();
        }}>
            <p className='center f3 '>
            {'Tady si můžeš vyhledat svůj oblíbený drink'}
        </p>
        <div className='center '>
            <div className='form center pa4 br3 shadow-5 '>
            <input className='f4 pa2 w-70 center' type="text" onInput={(e) => {

                setSearchField(e.target.value)

            }} value={searchField}/>
           
               <input type="submit" className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' value="Najdi"/>
           </div>
            
            </div>
        </form>
        <p>{errMessage}</p>
        
        <div className="">
            {vyhledaneRecepty.data && vyhledaneRecepty.data.length < 1?<p>Bohužel, žádné recepty s tímto dotazem nebyly nalezeny</p>:<></>}
        {vyhledaneRecepty.data?vyhledaneRecepty.data.map((recept, index) => {
            return(
                <div key={index} index={index} onClick={() => {
                    setZvolenyRecept(index);
                    route.push("/detail-receptu");
                }}>
                    <div className="tc mw6 grow bg-washed-yellow br3 dt center pa4 ma4 bw2 shadow-5">
                        <strong className="ttu">{recept.nazevReceptu}</strong> <br/>
                        <br></br>
                        <img width="200" src={recept.nahledovyObrazek} alt={recept.nazevReceptu}/>
                        <div className="obsah ">
                        
                        <p> {recept.popis}</p>
                        </div>
                    </div>
                 </div>
            )
        }):<></>}
    </div></>
    )
}

export default SerpSearch
