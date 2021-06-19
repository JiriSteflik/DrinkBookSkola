import React from 'react';
import './App.css';
import Main from './pages/Main';
import SeznamDrinku from './pages/seznamDrinku';
import AddDrink from './pages/addRecipe';
import SERP from "./pages/Serp";
import DeatailDrink from "./component/DetailDrink";

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from './component/Menu';
import {GlobalProvider} from './context/GlobalContext'
import PridejSurovinu from './pages/pridejSurovinu'

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
      <Menu />
        <Switch>
     
          <Route exact path="/" component={Main} />
          <Route exact path="/seznam-drinku" component={SeznamDrinku} />
          <Route exact path="/pridej-surovinu" component={PridejSurovinu} />
          <Route exact path="/add-recipe" component={AddDrink} />
          <Route exact path="/search-engine-result-page"  component={SERP}/>
          <Route exact path="/detail-receptu"  component={DeatailDrink}/>
          
        </Switch>
      
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App

