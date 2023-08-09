import React from 'react';
import { useState, useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import TimerComponent from './TimerComponent';
import HeatMapTemp from './HeatMapTemp';

import '../app.scss';
import './pomodoro.scss';
dayjs.extend(objectSupport);
function Pomodoro() {

  const [duration,setDuration] = useState(3);
  const [showSettings,setShowSettings] = useState(false);

  const handleAccept = (e) => {
    const uduration = (e.$m * 60) + e.$s;
    setDuration(uduration);
  }
  const handleReachZero = () => {
    console.log("reached zero - a call from parent");
  }

  return (
    <div className = "pomodoro-wrap">
      <TimerComponent 
        limit = {duration}
        onReachZero={handleReachZero}
        toChangeLimit={()=>setShowSettings(prev=>!prev)}
      />

      {showSettings
      ?
        <div className = "settings-wrap" hidden={!showSettings}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker 
            orientation="landscape"
            views={['minutes','seconds']}
            onAccept={(e)=>handleAccept(e)}
            onClose={()=>setShowSettings(prev=>!prev)}
            defaultValue={dayjs().set({minute:30,seconds:30})}
            />
        </LocalizationProvider>      
        </div>
      :null
      }  

      <div className = "streak-track-wrap" hidden ={showSettings}>
        <HeatMapTemp/>
      </div>
    </div>
  )
}

export default Pomodoro;