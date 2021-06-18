import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalContext';

const AddRecipe = () => {
  const [nazevReceptu, setNazevReceptu] = useState("");
  const [popis, setPopis] = useState(""); 
  const [dobaPripravy, setDobaPripravy] = useState("");
  const [nahledovyObrazek, setNahledovyObrazek] = useState("");
  const [msgZeServeru, setMsgZeServeru] = useState("");

const ulozitReceptDoDatabaze = () => {
    const schemaObjektu = {
      nazevReceptu:nazevReceptu,
      popis:popis,
      dobaPripravy:dobaPripravy,
      nahledovyObrazek:nahledovyObrazek,
      fullText:(() => {
        let finalstring = `${nazevReceptu} ${popis} ${dobaPripravy} `;
        
        return finalstring;
    })()
  }
  if(schemaObjektu.nazevReceptu.length <= 0 ){
    setMsgZeServeru({msg:"Název receptu není vyplněn - je to povinný údaj"})
}else if(schemaObjektu.popis.length<=0){
    setMsgZeServeru({msg:"Popis receptu nebyl vyplňěn - je to povinný údaj"})
}else if(schemaObjektu.dobaPripravy.length <=0){
    setMsgZeServeru({msg:"Doba přípravy není vyplněna - je to povinný údaj"})
}else if(schemaObjektu.nahledovyObrazek.length <=0){
    setMsgZeServeru({msg:"Náhledový obrázek nebyl přidán, využijte prosím externí URL adresy - je to povinný údaj"})

}else{
fetch("http://localhost:7000/save-recipe",{
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(schemaObjektu)
}).then((msg) => {
    return msg.json();
}).then((msg) => {
    setMsgZeServeru(msg);
    if(msg.msg === "Recept byl úspěšně uložen"){
       window.location.reload();
    }
}).catch((err) => {
    if(err){
        setMsgZeServeru("Nelze se připojit k server, opakujte akci později...")
    }
})
}
  }
  

  
    
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Vyplň drink</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="nazev-receptu">Název</label>
                <input
                  className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                  type="text"
                  onInput={(e) => setNazevReceptu(e.target.value)} value={nazevReceptu}
                  
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="popis">Popis receptu</label>
                <input
                  className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                  type="text"
                  onInput={(e) => setPopis(e.target.value)} value={popis}
                  />
                  
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="popis">Doba pripravy</label>
                <input
                  className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                  type="text"
                  onInput={(e) => setDobaPripravy(e.target.value)} value={dobaPripravy}
                  />
                  
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="popis">Obrázek drinku</label>
                <input
                  className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                  type="text"
                  onInput={(e) => {setNahledovyObrazek(e.target.value);}} placeholder="Umístěte externí odkaz" type="text" name="popis" value={nahledovyObrazek}/>
                  
                  
              </div>
              
            </fieldset>
            <div className="btn btn-save-item" onClick={ulozitReceptDoDatabaze}> Uložit receipt</div>
                    <p className="serverMsg">{msgZeServeru.msg}</p>
            
          </div>
        </main>
      </article>
    );
}
  
  


export default AddRecipe;






/*import React, {useState} from 'react'


const AddRecipe = () => {
    const [vstupOdUzivatele, setvstupOdUzivatele] = useState("");
const vlozeniDoDb = () => {
    fetch("http://localhost:7000/save-material", {
        method:"post",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({nazevReceptu:vstupOdUzivatele})
    }).then((data) => {
        return data.json();
    }).then((finalData) => {
        console.log(finalData.msg)
        setvstupOdUzivatele("");
    })
    
}
    return (
        <div>
            <input type="text" value={vstupOdUzivatele} onInput={(e) => {
                setvstupOdUzivatele(e.target.value);
            }} />
            <div className='btn'onClick={vlozeniDoDb}>Vlozit material</div>
            
        </div>
    )
}

export default AddRecipe*/