import React from 'react';
import './App.css';
import Main from './pages/Main';
import SeznamDrinku from './pages/seznamDrinku';
import AddRecipe from './pages/addRecipe';

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
          <Route exact path="/add-recipe" component={AddRecipe} />
          
        </Switch>
      
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App

