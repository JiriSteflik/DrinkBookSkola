import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalContext';
import AddIngredience from "./AddIngredience";
const ChooseIngredience = ({suroviny,vybranesuroviny}) => {
const [otevritPridaniSuroviny, setOtevritPridaniSuroviny] = useState(false);    
const [seznamSurovin, setSeznamSurovin] = useState([])
const {zapnutiVypnutiPaneluSVyberemSuroviny,vyberSurovinu} = useContext(GlobalContext);
const [inputState, setInputState] = useState("");
useEffect(() => {
    const filtered = suroviny.filter( function( el ) {

        const vybraneSuroviny = vybranesuroviny.map((surovina) => {
            return surovina.name;
        })
        return vybraneSuroviny.indexOf( el.name ) < 0;
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
        <div className="">
            <div className="plocha">
                <div className="zavrit" onClick={
                    () => {
                      zapnutiVypnutiPaneluSVyberemSuroviny(false)  
                    }
                }><p className="tc mw6 bg-red br4 pa2 ma3 dt center bw2 shadow-2 ">vypni</p></div>
                <div className="vyhledavaciPole"><input value={inputState} onInput={hledejSuroviny} type="text" placeholder={`Vyhledat ingredience`} /></div>
                <div className="suroviny">{seznamSurovin.map((surovina,index) => {
                    return(
                        <div onClick={() => {
                            const object = {
                                name:seznamSurovin[index].name,
                                mnozstvi:0
                            }
                            vyberSurovinu(object);
                            vymazZvoleneSurovinyZNabidky(object)
                        
                        }} className="surovina" key={index}>{surovina.name}</div>
                    )
                })}
                </div>
                <div className="buttnDva" onClick={()=>setOtevritPridaniSuroviny(!otevritPridaniSuroviny)}> Nenalezl jsi ingredienci?</div>
                {otevritPridaniSuroviny?<AddIngredience zavri={zavriDialogPridaniSuroviny}/>:<></>}
            </div>
        </div>
    )
}

export default ChooseIngredience