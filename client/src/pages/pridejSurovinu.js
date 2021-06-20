import React,{useState} from 'react'


const AddIngredience = () => {
    const [ingredience, setSurovina] = useState("");
    const [msgZeServeru, setMsgZeServeru] = useState("");
    
    
    const SaveIngToDb = () => {
        
        setMsgZeServeru("Ukládám... chvilku strpení");
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
            
          if(msg === "Surovina byla úspěšně uložena v našem seznamu!"){
          }
        }).catch((err) => {
            if(err){
                setMsgZeServeru("Nedošlo k uložení!")
            }
        })
    }
    return (
        <div>
            <div className="center pa4 setSirku">
                <input className='f4 pa2 w-70 center' type="text" onInput={(e)=>setSurovina(e.target.value)} value={ingredience} placeholder="Zadej ingredienci"/>
                <div onClick={SaveIngToDb} className="button w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Ulož </div> 
            </div>
                <div>
                    <p className ='tc f6 link mid-gray dim'>{msgZeServeru}</p>
                </div>
        </div>
    )
}

export default AddIngredience