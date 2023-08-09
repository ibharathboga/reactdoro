import React from 'react';
import {useState} from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ToDo from './forToDo/ToDo';
import Pomodoro from './forPomodoro/Pomodoro';
import Binaural from './forBinaural/Binaural';
import About from './forAbout/About';

import react_logo from './assets/react_logo.png';
import './app.scss';

function App() {

  const [tabvalue,setTabvalue] = useState(0);
  const [hideAbout,setHideAbout] = useState(true);

  return (
      <div className="App">
            
            <header>
                <img src = {react_logo} alt = "react_logo"/>
                <div className = "heads">
                  <button onClick = {()=>setHideAbout(true)}><h1 id="app-name">ReactDoroC5</h1></button>
                  <button onClick = {()=>setHideAbout(false)}><h1 id = "about">About</h1></button>
                </div>
            </header>

            <div hidden={hideAbout}>
              <About/>
            </div>

            <main hidden={!hideAbout}>
              <Tabs 
                value={tabvalue} 
                onChange={(e,v)=>setTabvalue(v)}
                centered
                variant = "fullWidth"
                sx={{fontSize:"90px"}}
              >
                <Tab label={<h2>to do</h2>} sx={{padding:"20px"}}/>
                <Tab label={<h2>pomodoro</h2>} sx={{padding:"20px"}}/>
                <Tab label={<h2>binaural</h2>} sx={{padding:"20px"}}/>
              </Tabs>

              <div hidden={0!==tabvalue}>
                <ToDo/>
              </div>
              <div hidden={1!==tabvalue}>
                <Pomodoro/>
              </div>
              <div hidden={2!==tabvalue}>
                <Binaural/>
              </div>
            </main>
      </div>
  );
}

export default App;