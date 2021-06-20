import React, { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";

/**
 * 1. Vyplnit defaultní state
 */
 const mainState = {
  choosenIngredience:[],
  onIngrediencePanel:false,
  foundRecipe:[],
  choosenRecipe:0,
  };

export const GlobalContext = createContext(mainState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, mainState);
  /**
   * 
   * 3. Funkce která manipuluje s příslušným statem z bodu 1 
   */
 /*const zmenSurovinu = (ingredience) => {
   dispatch({
     type:"ZMENA_SUROVINY",
     payload:ingredience
   })
   
 }*/
 const onOffIngrediencePanel = (bool) => {
  dispatch({
    type:"ON_OFF_INGREDIENCE_PANEL",
    payload:bool
  })
}
const chooseIngredience = (ingredience) => {
  dispatch({
    type:"CHOOSE_INGREDIENCE",
    payload:ingredience
  })
}

const setChooseIngredience = (arr) => {
  dispatch({
    type:"SET_CHOOSE_INGREDIENCE",
    payload:arr
  })
}

const setFindDrinks = (arr) => {
  dispatch({
    type:"SET_FIND_DRINKS",
    payload:arr
  })
}
const setChooseRecipe = (number) => {
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
        ingredience:state.ingredience,
        //zmenSurovinu,
      
        //Seznam vybraných surovin do receptu
        choosenIngredience:state.choosenIngredience,
        chooseIngredience,
        setChooseIngredience,
        
        onIngrediencePanel:state.onIngrediencePanel,
        onOffIngrediencePanel,
        
        foundRecipe:state.foundRecipe,
        setFindDrinks,
  
        choosenRecipe:state.choosenRecipe,
        setChooseRecipe
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
