const reducer = (state, action) => {
    switch (action.type) {
      /**
       * 4 - zde se  zpracuje finální operace
       */
      case "ZMENA_SUROVINY":
        return{
          ...state,
          ingredience:action.payload
        }
        case "CHOOSE_INGREDIENCE":
        return {
          ...state,
          choosenIngredience: [...state.choosenIngredience,action.payload],
        };
        
      case "ON_OFF_INGREDIENCE_PANEL":
        return {
          ...state,
          onIngrediencePanel: action.payload,
        };
      case "SET_CHOOSE_INGREDIENCE":
        return {
          ...state,
          choosenIngredience: action.payload,
        };
      case "SET_FIND_DRINKS":
        return {
          ...state,
          foundRecipe: action.payload,
        };
      case "SET_CHOOSE_RECIPE":
        return {
          ...state,
          choosenRecipe: action.payload,
        };
      default:
        return state;
    }
  };

  export default reducer;