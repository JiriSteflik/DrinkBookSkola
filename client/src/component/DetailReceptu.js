import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalContext'


const DetailReceptu = () => {
    const {vyhledaneRecepty,zvolenyRecept} = useContext(GlobalContext);
    const [pocetOsob, setpocetOsob] = useState(1);
    return (
       
        <div className="tc mw6 bg-washed-yellow br4 pa2 ma2 dt center bw2 shadow-5">
             {vyhledaneRecepty.data?<>
            <h1>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].nazevReceptu:<></>}</h1>
            <div className="">
                <div className="img"><div>{vyhledaneRecepty.data?<img width="250"  src={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek} alt={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek}/>:<></>}</div>
            </div>
                <div><h4> Doba přípravy</h4>
            <p>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].dobaPripravy:<></>}</p>
            
            <h4> Postup</h4>
            <p dangerouslySetInnerHTML={{__html:vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].popis:<></>}}></p>
            
            <h4> Seznam surovin</h4>
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

export default DetailReceptu
