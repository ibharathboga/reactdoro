import React from 'react';
import { useState, useRef } from 'react';

import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';


import  Sound from 'react-sound';
import Button from '@mui/material/Button';
import addNotification from 'react-push-notification';

import TimerComponent from './TimerComponent';
import HeatMap from './HeatMap';

import alarm_sound from '../assets/alarm.wav';
import logo from '../assets/react_logo.png';
import '../app.scss';
import './pomodoro.scss';

window.soundManager.setup({debugMode: false});
dayjs.extend(objectSupport);

function Pomodoro() {

  const [duration,setDuration] = useState(3);
  const [showSettings,setShowSettings] = useState(false);
  const trackref = useRef();
  const [playAlarm,setPlayAlarm] = useState(false);

  const handleAccept = (e) => {
    const uduration = (e.$m * 60) + e.$s;
    setDuration(uduration);
  }
  const handleReachZero = () => {
    // console.log("reached zero - a call from parent");
    trackref.current.handleAddType(duration);
    addNotification({
      title: "ReactDoroC5",
      message: "Timer Reached Zero!",
      duration:3000,
      icon:{logo},
      native:true
    });
    
    setPlayAlarm(true);
  }
  
  // useEffect(()=>{console.clear()},[playAlarm])
  
  return (
    <div className = "pomodoro-wrap">
      <div hidden = {playAlarm}>
      <TimerComponent 
        limit = {duration}
        onReachZero={handleReachZero}
        toChangeLimit={()=>setShowSettings(prev=>!prev)}
        />
      </div>

      <div className = "stop-alarm-button-wrap">
        {
          playAlarm 
          ?
            <Button
            className ="stopAlarmButton"
            hidden = {playAlarm}
            onClick = {()=>setPlayAlarm(false)}
            color="error"
            variant="contained">
              stop alarm
            </Button>
          : null
        }
      </div>

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
        <HeatMap ref = {trackref}/>  
      </div>

      <div>

        <Sound
        url={alarm_sound}
        playStatus={playAlarm ? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={0}
        volume={20}
        loop ={true}
        />

      </div>

    </div>
  )
}

export default Pomodoro;