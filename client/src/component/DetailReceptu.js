import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalContext'


const DetailReceptu = () => {
    const {vyhledaneRecepty,zvolenyRecept} = useContext(GlobalContext);
    
    return (
       
        <div className="tc grow bg-washed-yellow br2 pa2 ma2 dt center bw2 shadow-5">
             {vyhledaneRecepty.data?<>
            <h1>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].nazevReceptu:<></>}</h1>
            <div>
                <div className="img"><div>{vyhledaneRecepty.data?<img width="200" src={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek} alt={vyhledaneRecepty.data[zvolenyRecept].nahledovyObrazek}/>:<></>}</div>
            </div>
                <div><h4> Doba přípravy</h4>
            <p>{vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].dobaPripravy:<></>}</p>
            
            <h4> Postup</h4>
            <p dangerouslySetInnerHTML={{__html:vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].popis:<></>}}></p>
            
            <h4> Seznam surovin</h4>
            <div className="">
                {vyhledaneRecepty.data?vyhledaneRecepty.data[zvolenyRecept].suroviny.map((surovina, index) => {
                    return(<div key={index}>
                        {
                           
                        surovina.name + " ("+((surovina.mnozstvi)+"g)")}
                    </div>)
                }):<></>}
            </div>
            </div>
            
            </div>
            </>:<>Bohužel se nám nepodařilo žádná data načíst</>}
        </div>
    )
}

export default DetailReceptu
