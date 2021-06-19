const reducer = (state, action) => {
    switch (action.type) {
      /**
       * 4 - zde se  zpracuje finální operace
       */
      case "ZMENA_SUROVINY":
        return{
          ...state,
          surovina:action.payload
        }
        case "CHOOSE_INGREDIENCE":
        return {
          ...state,
          vybraneSuroviny: [...state.vybraneSuroviny,action.payload],
        };
        
      case "ON_OFF_INGREDIENCE_PANEL":
        return {
          ...state,
          zapniPanelSVyberemSurovin: action.payload,
        };
      case "SET_CHOOSE_INGREDIENCE":
        return {
          ...state,
          vybraneSuroviny: action.payload,
        };
      case "SET_FIND_DRINKS":
        return {
          ...state,
          vyhledaneRecepty: action.payload,
        };
      case "SET_CHOOSE_RECIPE":
        return {
          ...state,
          zvolenyRecept: action.payload,
        };
      default:
        return state;
    }
  };

  export default reducer;