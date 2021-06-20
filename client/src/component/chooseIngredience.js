import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalContext';
import AddIngredience from "./AddIngredience";
const ChooseIngredience = ({suroviny,vybranesuroviny}) => {
const [otevritPridaniSuroviny, setOtevritPridaniSuroviny] = useState(false);    
const [seznamSurovin, setSeznamSurovin] = useState([])
const {onOffIngrediencePanel,chooseIngredience} = useContext(GlobalContext);
const [inputState, setInputState] = useState("");
useEffect(() => {
    const filtered = suroviny.filter( function( el ) {

        const choosenIngredience = vybranesuroviny.map((ingredience) => {
            return ingredience.name;
        })
        return choosenIngredience.indexOf( el.name ) < 0;
      } );
    setSeznamSurovin(filtered);
    return () => {
        return false;
    }
}, [suroviny, vybranesuroviny]);

const hledejSuroviny = (e) => {
    const value = e.target.value;
    setInputState(value)
    const regExp = new RegExp(value,"gi");
    const search = suroviny.filter((item) => {
        return item.name.match(regExp);
    })
   setSeznamSurovin(search);
}

const vymazZvoleneSurovinyZNabidky = (item) => {
    const cistaData = seznamSurovin.filter((polozka) => {
        return item.name !== polozka.name
    })
    setSeznamSurovin(cistaData);
}

const zavriDialogPridaniSuroviny = () => {
    setOtevritPridaniSuroviny(false)
}

return (
        <div className="tc mw6 bg-transparent br4 pa2 ma2 dt center bw2 shadow-5 ">
            <div className="">
                <div className="" onClick={
                    () => {
                        onOffIngrediencePanel(false)  
                    }
                }><p className="tc mw6 bg-red br4 pa2 ma3 dt center bw2 shadow-2 pointer w-50 ">Zavřít</p></div>
                <div className="tc pa2"><input value={inputState} onInput={hledejSuroviny} type="text" placeholder={`Vyhledat ingredience`} /></div>
                <div className="">{seznamSurovin.map((ingredience,index) => {
                    return(
                        <div onClick={() => {
                            const object = {
                                name:seznamSurovin[index].name,
                                amount:0
                            }
                            chooseIngredience(object);
                            vymazZvoleneSurovinyZNabidky(object)
                        
                        }} className="tc dib  bg-washed-yellow br3 pa1 ma2 bw2 shadow-5 grow" key={index}>{ingredience.name}</div>
                    )
                })}
                </div>
                <div className="tc mw6 bg-blue br4 pa2 ma3 dt center bw2 shadow-2 w-50 " onClick={()=>setOtevritPridaniSuroviny(!otevritPridaniSuroviny)}> Nenalezl jsi ingredienci?</div>
                {otevritPridaniSuroviny?<AddIngredience zavri={zavriDialogPridaniSuroviny}/>:<></>}
            </div>
        </div>
    )
}

export default ChooseIngredience