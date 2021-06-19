import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalContext';
import VyberSurovin from '../component/vyberSuroviny';
const AddRecipe = () => {
  const {
    zapniPanelSVyberemSurovin,
    zapnutiVypnutiPaneluSVyberemSuroviny,
    vybraneSuroviny,
    setVybraneSuroviny
} = useContext(GlobalContext);

  const [nazevReceptu, setNazevReceptu] = useState("");
  const [popis, setPopis] = useState(""); 
  const [dobaPripravy, setDobaPripravy] = useState("");
  const [nahledovyObrazek, setNahledovyObrazek] = useState("");
  
  const [suroviny, setSuroviny] = useState([]); 
  const [msgZeServeru, setMsgZeServeru] = useState("");
  
    
     const getVsechnySuroviny = async () => {
        zapnutiVypnutiPaneluSVyberemSuroviny(true);
     fetch("http://localhost:7000/get-materials").then((data) => {
         return data.json();
     }).then(({data}) => {

         setSuroviny(data);
     })
    }

  
     const prepocitejGramaz = (array) => {
      let sum = 0;
       array.forEach((item) => sum += +item.mnozstvi);
      
  }

 
   const menicMnozstvi = (e) => {
    
    if(e.target.value && e.target.value > 0){
    const index = e.target.getAttribute("index");
    vybraneSuroviny[index].mnozstvi = parseInt(e.target.value);
    setVybraneSuroviny(vybraneSuroviny);
    prepocitejGramaz(vybraneSuroviny);
  }else{
      
      const index = e.target.getAttribute("index");
    vybraneSuroviny[index].mnozstvi = parseInt(0);
    setVybraneSuroviny(vybraneSuroviny);
    prepocitejGramaz(vybraneSuroviny);
  }
}
  
   const smazZvolenouSurovinu = (e) => {
    const index = e.target.getAttribute("index");
    const ocisteneVybraneSuroviny = vybraneSuroviny.filter((item) =>item.name !== vybraneSuroviny[index].name);
    setVybraneSuroviny(ocisteneVybraneSuroviny);
    prepocitejGramaz(vybraneSuroviny);
}
  

const ulozitReceptDoDatabaze = () => {
  
    const schemaObjektu = {
      nazevReceptu:nazevReceptu,
      popis:popis,
      dobaPripravy:dobaPripravy,
      nahledovyObrazek:nahledovyObrazek,
      suroviny:vybraneSuroviny,
      
      fullText:(() => {
        let finalstring = `${nazevReceptu} ${popis} ${dobaPripravy} `;
        
        return finalstring;
    })()
  }
  if(schemaObjektu.nazevReceptu.length <= 0 ){
    setMsgZeServeru({msg:"Vypln nazev receptu"})
}else if(schemaObjektu.popis.length<=0){
    setMsgZeServeru({msg:"Vypln popis receptu"})
}else if(schemaObjektu.dobaPripravy.length <=0){
    setMsgZeServeru({msg:"Vypln dobu pripravy"})
}else if(schemaObjektu.nahledovyObrazek.length <=0){
    setMsgZeServeru({msg:"Vloz url k obrazku"})

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
    if(msg.msg === "Drink byl uložen"){
       window.location.reload();
    }
}).catch((err) => {
    if(err){
        setMsgZeServeru("Nelze se připojit")
    }
})
}
  }
 
  return (
      
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-40-l mw6 shadow-3 center">
       
       {zapniPanelSVyberemSurovin?<VyberSurovin vybranesuroviny={vybraneSuroviny} suroviny={suroviny}/>:<></>}
         
       
           
        <main className="pa3 black-80 add-recipe">
          <div className="measure">
            <fieldset className="ba b--transparent ph0 mh0">
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
                  onInput={(e) => {setNahledovyObrazek(e.target.value);}} placeholder="Umístěte externí odkaz"  name="popis" value={nahledovyObrazek}/>
                  
                  
              </div>
              <div className="card">
                
                        <div className="card">
                           <br/>
                             <div className="vypisSuroviny">
                             {vybraneSuroviny.map(({name},index) => {
                              return (
                                  <div className="polozka" key={index}><strong>{name}(g):</strong>
                                  <input key={index} onInput={menicMnozstvi} 
                                   index={index}type="number" name={name} value={vybraneSuroviny[index].mnozstvi}/><div className="deleteThisItem" 
                                   index={index} onClick={smazZvolenouSurovinu} >smazat</div></div>
                              )
                              })}
                          </div>
                           <div onClick={() => {
                               getVsechnySuroviny()
                               }} className="btn btn-add-item">Přidat surovinu</div>
                        </div>
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





