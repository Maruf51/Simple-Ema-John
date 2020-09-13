import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Order from './Components/Order/Order';
import Inventory from './Components/Inventory/Inventory';
import PageError from './Components/PageError/PageError';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Shipment from './Components/Shipment/Shipment';
import LogIn from './Components/Login/Login';
import Register from './Components/Register/Register';
// import { useContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {
        loggedInUser.success && <h1 className="welcomeEmail">Welcome: <span className="loggedInEmail">{loggedInUser.email}</span></h1>
      }
      <Router>
        <Header></Header>
        <Switch>
          <Route path='/order'>
            <Order></Order>
          </Route>
          <PrivateRoute path='/inventory'>
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path='/login'>
            <LogIn></LogIn>
          </Route>
          <Route path='/register'>
            <Register></Register>
          </Route>
          <PrivateRoute path='/Shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetail></ProductDetail>
          </Route>
          <Route path='*'>
            <PageError></PageError>
          </Route>
        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
