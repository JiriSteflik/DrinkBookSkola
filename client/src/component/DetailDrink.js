import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalContext'


const DetailDrink = () => {
    const {vyhledaneRecepty,zvolenyRecept} = useContext(GlobalContext);
    const [pocetOsob, setpocetOsob] = useState(1);
    return (
       
        <div className="tc mw6 bg-washed-yellow br4 pa2 ma2 dt center bw2 shadow-5">
             {vyhledaneRecepty.data?<>
            <h1 className="f2 b gray ttu">{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].nazevReceptu:<></>}</h1>
            <div className="">
                <div className=""><div>{vyhledaneRecepty.data?<img className="shadow-2 grow 4" width="250"  src={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek} alt={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek}/>:<></>}</div>
            </div>
                <div><h4 className="f4 b gray ttu"> Doba přípravy</h4>
            <p>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].dobaPripravy:<></>}</p>
            
            <p className="f4 b gray ttu"> Postup</p>
            <p className="i" dangerouslySetInnerHTML={{__html:vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].popis:<></>}}></p>
            
            <p className="f5 b gray ttu"> Seznam surovin</p>
                <span>Suroviny jsou pro: <input className="pa0 black-50 w2 tc" type="text" onInput={(e)=>setpocetOsob(e.target.value)} value={pocetOsob} />
                
                {pocetOsob===1?" osobu":pocetOsob>1&&pocetOsob<5?" osoby":" osob"} </span>
            <div className="di gray"><br></br>
                {vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].suroviny.map((surovina, index) => {
                    <br></br>
                    return(<div className="di pa2" key={index}>
                        {
                           
                        surovina.name + " ("+((surovina.mnozstvi)*pocetOsob+"g),")}
                    </div>)
                }):<></>}
            </div>
            </div>
            
            </div>
            </>:<>nenacetli jsme zadne data</>}
        </div>
    )
}

export default DetailDrink
