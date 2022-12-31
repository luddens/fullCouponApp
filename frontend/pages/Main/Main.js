import React, {Component, useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
// import {PropTypes} from "prop-types";

import LocalStore from "../../stores/LocalStore";

import Register from "../../globalComponents/Register";
import Login from "../../globalComponents/Login";
import Cart from "../../globalComponents/Cart";
import Upload from "../../globalComponents/Upload";
import Payment from "../../globalComponents/Payment";
import Map from "../../globalComponents/Map";
import Webcam from "../../globalComponents/Webcam";

const socket = new WebSocket("ws://localhost:8081", "protocolOne");

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(LocalStore.store.getLoggedIn());
  const [unmountLoginForms, setUnmountLoginForms] = useState(LocalStore.store.getLoggedIn());
  
  const testSocket = (e)=>{
    socket.send("hello");
  };
  
  const updateLoggedInStatus = (loggedIn)=>{
    setLoggedIn(loggedIn);
  };

  const updateMountStatus = (mount)=>{
    setUnmountLoginForms(mount);
  };

  const revealLoginForms = (delay) => { 
    setTimeout(()=>{
      updateLoggedInStatus(false);
      updateMountStatus(false);
    }, delay);
  };

  const hideLoginForms = (showDelayTime)=>{;

    updateLoggedInStatus(true);

    setTimeout(()=>{
      updateMountStatus(true);
    }, 1000); //1000 is the scss animation time

    revealLoginForms(showDelayTime);
  };

  useEffect(()=>{
    if(LocalStore.store.getLoggedIn()){
      revealLoginForms(LocalStore.store.getLoginExpiryTime());
    }
  }, []);

  var loginInnerContainerClasses = ( loggedIn ?"hidden": "") + " anim";
  return (
    <Router>
      <button id = "clickme" onClick = {(e)=>{testSocket(e)}}>
        Socket Test
      </button>
      <div id = "main">
        <div>
          <div id = "header">
            <h1>Planner Pocket</h1>
            <ul >
              <li><Link to = "/account">Account</Link></li>
              <li><Link to = "/newlist">New List</Link></li>
              <li><Link to = "/uploads">Uploads</Link></li>
              <li><Link to = "/stores">Stores</Link></li>
              <li><Link to = "/checkout">Checkout</Link></li>
              <li><Link to = "/webcam">Chat</Link></li>
            </ul>
          </div> 
          {/* https://www.youtube.com/watch?v=CZeulkp1ClA */}
          {/* <Switch>
            <Map  = "/stores" />
            <Upload  = "/uploads" />
            <Payment  = "/account" />
            <Cart  = "/checkout"/>
            <Webcam  = "/webcam"/>
          </Switch> */}
          {/* <Switch> */}
            <Map />
            <Upload />
            <Cart />
            <Payment/>
            <Webcam />
          {/* </Switch> */}
          <div id = "loginFormsContainer">
            <div className = {loginInnerContainerClasses} >
              {!unmountLoginForms ? <Register hideSelf = {hideLoginForms} showSelf = {revealLoginForms} /> :null}
              {!unmountLoginForms ? <Login  hideSelf = {hideLoginForms} showSelf = {revealLoginForms}/> :null}
            </div>
          </div>
          {/*<BrowserRouter>
            <Switch>  
              <Route ="/" component={Todolist} />
              <Route ="/login" render={(props) => {
                                    if(!LocalStore.getLoggedIn()){
                                        return <Login {...props} />;
                                    } else {
                                        return <Redirect to="/"/>;
                                    }                   
                                }}>
              </Route>

              <Route ="/register" render={(props) => {
                                    if(!LocalStore.getLoggedIn()){
                                        return <Register {...props} />;
                                    } else {
                                        return <Redirect to="/"/>;
                                    }                   
                                }}>
              </Route>
            </Switch>
          </BrowserRouter> */}
        </div>
      </div>
    </Router>
  );
} 

Main.displayName = "Main";
