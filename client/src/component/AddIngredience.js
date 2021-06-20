import React,{useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalContext';

const AddIngredience = ({zavri}) => {
    const [ingredience, setIngredience] = useState("");
    const [msgZeServeru, setMsgZeServeru] = useState("");
    const [showButton, setShowButton] = useState(true);
    const {onOffIngrediencePanel,chooseIngredience} = useContext(GlobalContext);
    const SaveIngrToDb = () => {
        setShowButton(false);
        setMsgZeServeru("Ukládání");
        fetch("http://localhost:7000/save-material",{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:ingredience.toLowerCase()})
        }).then((response) => {
            return response.json();
        }).then(({msg}) => {
            setMsgZeServeru(msg);
            setShowButton(true);
          if(msg === "Ingredience se uložila!"){
              //Zde dojde k uložení a celkovému propsání do seznamu všech surovin
              chooseIngredience({
                name:ingredience,
                amount:0
             })
             onOffIngrediencePanel(false);
          }
        }).catch((err) => {
            if(err){
                setMsgZeServeru("Ingredience nebyla uložena!")
                setShowButton(true)
            }
        })
    }
    return (
        <div className="tc mw6 bg-transparent br4 pa2 ma3 dt center bw2 shadow-2">
             <div className="" onClick={zavri}><p className="f4 link dim ph3 pv2 mb2 dib white bg-red br-pill grow">zavrit</p></div>
            <p className="f3 b">Přidání ingredience</p>
            <div className="center pa3 setSirku">
            <input className='f4 pa2 w-60 center' type="text" onInput={(e)=>setIngredience(e.target.value)} value={ingredience} placeholder="Zadej ingredienci"/>
           {showButton?<div onClick={SaveIngrToDb} className="button w-40 grow f3 link ph3 pv2 dib white bg-light-purple"> Uložit</div>:<></>} 
           <div>
           </div>
                    <p className ='tc f6 link mid-gray dim'>{msgZeServeru}</p>
                </div>
        </div>
    )
}

export default AddIngredience