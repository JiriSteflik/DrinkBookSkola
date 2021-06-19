import React, { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";

/**
 * 1. Vyplnit defaultní state
 */
 const mainState = {
  vybraneSuroviny:[],
  zapniPanelSVyberemSurovin:false,
  vyhledaneRecepty:[],
  zvolenyRecept:0,
  };

export const GlobalContext = createContext(mainState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, mainState);
  /**
   * 
   * 3. Funkce která manipuluje s příslušným statem z bodu 1 
   */
 /*const zmenSurovinu = (surovina) => {
   dispatch({
     type:"ZMENA_SUROVINY",
     payload:surovina
   })
   
 }*/
 const zapnutiVypnutiPaneluSVyberemSuroviny = (bool) => {
  dispatch({
    type:"ON_OFF_INGREDIENCE_PANEL",
    payload:bool
  })
}
const vyberSurovinu = (surovina) => {
  dispatch({
    type:"CHOOSE_INGREDIENCE",
    payload:surovina
  })
}

const setVybraneSuroviny = (arr) => {
  dispatch({
    type:"SET_CHOOSE_INGREDIENCE",
    payload:arr
  })
}

const setVyhledaneRecepty = (arr) => {
  dispatch({
    type:"SET_FIND_DRINKS",
    payload:arr
  })
}
const setZvolenyRecept = (number) => {
  dispatch({
    type:"SET_CHOOSE_RECIPE",
    payload:number
  })
}

  return (
    <GlobalContext.Provider
    /**
     * 2. Propíšete tu hodnotu z toho statu
     */
      value={{
        surovina:state.surovina,
        //zmenSurovinu,
      
        //Seznam vybraných surovin do receptu
        vybraneSuroviny:state.vybraneSuroviny,
        vyberSurovinu,
        setVybraneSuroviny,
        
        zapniPanelSVyberemSurovin:state.zapniPanelSVyberemSurovin,
        zapnutiVypnutiPaneluSVyberemSuroviny,
        
        vyhledaneRecepty:state.vyhledaneRecepty,
        setVyhledaneRecepty,
  
        zvolenyRecept:state.zvolenyRecept,
        setZvolenyRecept
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
