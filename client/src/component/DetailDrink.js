import React, {useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalContext'


const DetailDrink = () => {
    const {foundRecipe,choosenRecipe} = useContext(GlobalContext);
    const [numberOfPeople, setnumberOfPeople] = useState(1);
    return (
       
        <div className="tc mw6 bg-washed-yellow br4 pa2 ma2 dt center bw2 shadow-5">
             {foundRecipe.data?<>
            <h1 className="f2 b gray ttu">{foundRecipe.data?foundRecipe.data[choosenRecipe].nazevReceptu:<></>}</h1>
            <div className="">
                <div className=""><div>{foundRecipe.data?<img className="shadow-2 grow 4" width="250"  src={foundRecipe.data[choosenRecipe].nahledovyObrazek} alt={foundRecipe.data[choosenRecipe].nahledovyObrazek}/>:<></>}</div>
            </div>
                <div><h4 className="f4 b gray ttu"> Doba přípravy</h4>
            <p>{foundRecipe.data?foundRecipe.data[choosenRecipe].dobaPripravy:<></>}</p>
            
            <p className="f4 b gray ttu"> Postup</p>
            <p className="i" dangerouslySetInnerHTML={{__html:foundRecipe.data?foundRecipe.data[choosenRecipe].popis:<></>}}></p>
            
            <p className="f5 b gray ttu"> Seznam surovin</p>
                <span>Suroviny jsou pro: <input className="pa0 black-50 w2 tc" type="text" onInput={(e)=>setnumberOfPeople(e.target.value)} value={numberOfPeople} />
                
                {numberOfPeople===1?" osobu":numberOfPeople>1&&numberOfPeople<5?" osoby":" osob"} </span>
            <div className="di gray"><br></br>
                {foundRecipe.data?foundRecipe.data[choosenRecipe].suroviny.map((ingredience, index) => {
                    <br></br>
                    return(<div className="di pa2" key={index}>
                        {
                           
                        ingredience.name + " ("+((ingredience.amount)*numberOfPeople+"g),")}
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
