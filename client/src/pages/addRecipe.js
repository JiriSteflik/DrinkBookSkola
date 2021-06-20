import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalContext';
import ChooseIngredience from '../component/chooseIngredience';
const AddRecipe = () => {
  const {
    onIngrediencePanel,
    onOffIngrediencePanel,
    choosenIngredience,
    setChooseIngredience
} = useContext(GlobalContext);

  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState(""); 
  const [prepareTime, setPrepareTime] = useState("");
  const [seePicture, setSeePicture] = useState("");
  const [ingredience, setIngredience] = useState([]); 
  const [msgZeServeru, setMsgZeServeru] = useState("");
  
    
     const getAllIngredience = async () => {
      onOffIngrediencePanel(true);
     fetch("http://localhost:7000/get-materials").then((data) => {
         return data.json();
     }).then(({data}) => {

       setIngredience(data);
     })
    }

  


 
   const changeAmmount = (e) => {
    
    if(e.target.value && e.target.value > 0){
    const index = e.target.getAttribute("index");
    choosenIngredience[index].amount = parseInt(e.target.value);
    setChooseIngredience(choosenIngredience);
    
  }else{
      
      const index = e.target.getAttribute("index");
    choosenIngredience[index].amount = parseInt(0);
    setChooseIngredience(choosenIngredience);
    
  }
}
  
   const deleteIngredience = (e) => {
    const index = e.target.getAttribute("index");
    const ocisteneVybraneSuroviny = choosenIngredience.filter((item) =>item.name !== choosenIngredience[index].name);
    setChooseIngredience(ocisteneVybraneSuroviny);
    
}
  

const saveToDatabase = () => {
  
    const schemaObjektu = {
      nazevReceptu:recipeName,
      popis:description,
      dobaPripravy:prepareTime,
      nahledovyObrazek:seePicture,
      suroviny:choosenIngredience,
      
      fullText:(() => {
        let finalstring = `${recipeName} ${description} ${prepareTime} `;
        
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
    <div>
      {onIngrediencePanel?<ChooseIngredience vybranesuroviny={choosenIngredience} suroviny={ingredience}/>:<></>}
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-40-l mw6 shadow-3 center">
       
       
         
       
           
        <main className="pa3 black-80 add-recipe ">
          <div className="measure">
            <fieldset className=" b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 tc">Vyplň drink</legend>
              <div className="mt3">
                  <label className="db fw6 lh-copy f6 ct" htmlFor="nazev-receptu">Název</label>
                    <input
                          className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                          type="text"
                          onInput={(e) => setRecipeName(e.target.value)} placeholder="Zvol nazev drinku" value={recipeName}
                    />
              </div>

              <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="popis">Popis drinku</label>
                       <input
                          className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                          type="text"
                          onInput={(e) => setDescription(e.target.value)} placeholder="Popiš přípravu receptu" value={description}
                       />
              </div>

              <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="popis">Doba pripravy</label>
                       <input
                          className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                          type="text"
                          onInput={(e) => setPrepareTime(e.target.value)} placeholder="Zapis dobu pripravy v minutach" value={prepareTime}
                       />
              </div>

              <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="popis">Obrázek drinku</label>
                       <input
                          className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                          type="text"
                          onInput={(e) => {setSeePicture(e.target.value);}} placeholder="Umístěte externí odkaz"  name="popis" value={seePicture}
                       />
              </div>

              <div className="">
                
                        <div className="">
                           <br/>
                             <div className="vypisSuroviny">
                             {choosenIngredience.map(({name},index) => {
                              return (
                                  <div className="br3 flex flex direction column bg-light-blue ma1 polozka" key={index}><strong>{name}(g):</strong>
                                  <input className="tc w-30 center bg-light-gray" key={index} onInput={changeAmmount} 
                                   index={index}type="number" name={name} value={choosenIngredience[index].amount}/><div className="absolute pointer  white pa3 br3 flex justify-center bg-red " 
                                   index={index} onClick={deleteIngredience} >smazat</div></div>
                              )
                              })}
                          </div>
                           
                        </div>
                        
              </div>
              <div onClick={() => {
                               getAllIngredience()
                               }} className="tc mw6 bg-blue br4 pa3 ma1 dt center bw2 shadow-2 w-70">Přidat ingredienci</div>
                    
              
            </fieldset>
            <div className="tc mw6 bg-blue br4 pa3 ma1 dt center bw2 shadow-2 w-70" onClick={saveToDatabase}> Uložit drink</div>
                    <p className="serverMsg">{msgZeServeru.msg}</p>
                    
            
          </div>
        </main>
       
      </article>
      <div className="tc">
    
    </div>
      </div>
      
    );
}
  
  


export default AddRecipe;





