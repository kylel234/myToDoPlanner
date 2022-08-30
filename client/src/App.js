import './App.css';
import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import ReactSwitch from 'react-switch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ThemeContext = createContext(null); // allows for the light/dark mode toggling functionality to apply to the whole site

function App() {

  // create proxy for localhost(see package.json in client folder), links like  http://localhost:3001/dashboard/todo/${tasks.id}
  // will only work on local environment
  // So we create a proxy so that we can use the app in development since it will be ignored in production
  // since there is no localhost specified it will use the heroku domain
  // ex: https://name of app herokuapp.com/name of method
  // heroku app helps serve the build static content while holding the restful api

  // make sure user stay in dashboard if they are still authenticated,
  // needs to get jwtoken to authorize user
  async function stillAuth() {
    const res = await fetch("/authenticate/verify", {
      method: "POST",
      headers: {jwt_token : localStorage.token}
    });

    const parseResponse = await res.json();
    //console.log(parseResponse);
    // checks to see if user is still authenticated and if so user stays in dashboard
    parseResponse ===  true ? setAuthenticated(true) : setAuthenticated(false);
  }
  
  const [mode, setMode] = useState("light"); // state that stores the current mode, default is light mode
  const [isAuthenticated, setAuthenticated] = useState(false) // state for checking authentication, default is false

  // checks if mode is currently light if not setsMode to the current mode
  const toggleMode = () => {
    setMode((currMode) => (currMode === "light" ? "dark" : "light"));
  }

  // changes state to reflect if user is authenticated
  const setAuthenticate = (isAuth) => {
    setAuthenticated(isAuth);
  }

  useEffect(() => {
    stillAuth();
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
    <div className="App" id={ mode }>
      <div>
          <label className="switch"> {mode === "light" ? "Light" : "Dark"}</label>
          <ReactSwitch onChange={toggleMode} checked={mode === "dark"}/>
      </div>
      <Router>
        <div className="container text-center">
          <Routes>
            <Route exact path='/dashboard' element={isAuthenticated ? <Dashboard setAuthenticate={setAuthenticate}/> : <Navigate to="/login" replace />}/>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/login' element={!isAuthenticated ? <Login setAuthenticate={setAuthenticate}/> : <Navigate to="/dashboard" replace />} />
            <Route exact path='/register' element={!isAuthenticated ? <Register setAuthenticate={setAuthenticate}/> : <Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
