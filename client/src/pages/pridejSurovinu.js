import React,{useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalContext';



const PridejSurovinu = ({zavri}) => {
    const [surovina, setSurovina] = useState("");
    const [msgZeServeru, setMsgZeServeru] = useState("");
    const [showButton, setShowButton] = useState(true);
    const {zapnutiVypnutiPaneluSVyberemSuroviny,vyberSurovinu} = useContext(GlobalContext);
    const ulozSurovinuNaServerADoAppky = () => {
        setShowButton(false);
        setMsgZeServeru("Ukládám... chvilku strpení");
        fetch("http://localhost:7000/save-material",{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:surovina.toLowerCase()})
        }).then((response) => {
            return response.json();
        }).then(({msg}) => {
            setMsgZeServeru(msg);
            setShowButton(true);
          if(msg === "Surovina byla úspěšně uložena v našem seznamu!"){
              //Zde dojde k uložení a celkovému propsání do seznamu všech surovin
             vyberSurovinu({
                name:surovina,
                mnozstvi:0
             })
             zapnutiVypnutiPaneluSVyberemSuroviny(false);
          }
        }).catch((err) => {
            if(err){
                setMsgZeServeru("Nedošlo k uložení!")
                setShowButton(true)
            }
        })
    }
    return (
        <div>
        <div className="center pa4 setSirku">
             <div className="zavrit" onClick={zavri}></div>
            
            <input className='f4 pa2 w-70 center' type="text" onInput={(e)=>setSurovina(e.target.value)} value={surovina} placeholder="Zadejte surovinu"/>
           {showButton?<div onClick={ulozSurovinuNaServerADoAppky} className="button w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Ulož </div>:<></>} 
           
            
        
            
        </div>
        <div>
        <p className ='tc f6 link mid-gray dim'>{msgZeServeru}</p>
        </div>
        </div>
    )
}

export default PridejSurovinu