import React, {useContext} from 'react'
import {GlobalContext} from "../context/GlobalContext"
const Material = ({cislovporadi,name,eventklik}) => {
    const {zmenSurovinu} = useContext(GlobalContext);
    return (
        <div>
           {cislovporadi} - {name}
           <div className="btn" onClick={() => {
               zmenSurovinu(name);
               eventklik(name);
           }}>Zobraz detail</div>
        </div>
    )
}
export default Material
