import React,{useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalContext';

const PridejSurovinu = ({zavri}) => {
    const [surovina, setSurovina] = useState("");
    const [msgZeServeru, setMsgZeServeru] = useState("");
    const [showButton, setShowButton] = useState(true);
    const {zapnutiVypnutiPaneluSVyberemSuroviny,vyberSurovinu} = useContext(GlobalContext);
    const ulozSurovinuNaServerADoAppky = () => {
        setShowButton(false);
        setMsgZeServeru("Ukládání");
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
          if(msg === "Ingredience se uložila!"){
              //Zde dojde k uložení a celkovému propsání do seznamu všech surovin
             vyberSurovinu({
                name:surovina,
                mnozstvi:0
             })
             zapnutiVypnutiPaneluSVyberemSuroviny(false);
          }
        }).catch((err) => {
            if(err){
                setMsgZeServeru("Ingredience nebyla uložena!")
                setShowButton(true)
            }
        })
    }
    return (
        <div className="pridaniSuroviny">
             <div className="zavrit" onClick={zavri}><p>zavrit</p></div>
            <h3>Přidání suroviny</h3>
            <input type="text" onInput={(e)=>setSurovina(e.target.value)} value={surovina} placeholder="Zadej ingredienci"/>
           {showButton?<div onClick={ulozSurovinuNaServerADoAppky} className="btn btn-pridej-surovinu"> Ulož novou surovinu</div>:<></>} 
            <p>{msgZeServeru}</p>
        </div>
    )
}

export default PridejSurovinu