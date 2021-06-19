import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalContext';
import PridejSurovinu from "./pridejSurovinu";
const VyberSuroviny = ({suroviny,vybranesuroviny}) => {
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
        <div classname="vyberSurovin">
            <div classname="plocha">
                <div classname="zavrit" onClick={
                    () => {
                      zapnutiVypnutiPaneluSVyberemSuroviny(false)  
                    }
                }> </div>
                <div classname="vyhledavaciPole"><input value={inputState} onInput={hledejSuroviny} type="text" placeholder={`Vyhledat ingredience`} /></div>
                <div classname="suroviny">{seznamSurovin.map((surovina,index) => {
                    return(
                        <div onClick={() => {
                            const object = {
                                name:seznamSurovin[index].name,
                                mnozstvi:0
                            }
                            vyberSurovinu(object);
                            vymazZvoleneSurovinyZNabidky(object)
                        
                        }} classname="surovina" key={index}>{surovina.name}</div>
                    )
                })}
                </div>
                <div classname="buttnDva" onClick={()=>setOtevritPridaniSuroviny(!otevritPridaniSuroviny)}><p>Tady neco bude</p> Požadovaná surovina v seznamu chybí?</div>
                {otevritPridaniSuroviny?<PridejSurovinu zavri={zavriDialogPridaniSuroviny}/>:<></>}
            </div>
        </div>
    )
}

export default VyberSuroviny