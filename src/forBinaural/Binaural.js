import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useFrequency } from 'react-frequency';
import MuiInput from '@mui/material/Input';
import Switch from '@mui/material/Switch';

import '../app.scss';
import './binaural.scss';
function Binaural() {

  const [leftFreq,setLeftFreq] = useState(100);
  const [rightFreq, setRightFreq] = useState(140);
  // const [syncWithPomo,setSyncWithPomo] = useState(false);
  
  const leftAudio = useFrequency({
    hz:leftFreq,
    type:"left",
    gain: 20 / 100,
    oscillator:"sine"
  });
  const rightAudio = useFrequency({
    hz:rightFreq,
    type:"right",
    gain: 20 / 100,
    oscillator:"sine"
  });

  const handleBinauralStart = () => {
    console.log("handleBinauralStart Called")
    leftAudio.start();
    rightAudio.start();
  }
  const handleBinauralStop = () => {
    console.log("handleBinauralStop Called")
    leftAudio.stop();
    rightAudio.stop();
  }
  const handleBinauralToggle = () => {
    console.log("handleBinauralToggle Called")
    leftAudio.toggle();
    rightAudio.toggle();
  }
  const handleStartStopButton = () => {
    console.log("handleStartStopButton Called")
    handleBinauralToggle();
  }

  return (
    <div className='binaural-wrap'>
      <h1>Frequency Difference : {Math.abs(leftFreq-rightFreq)}</h1>

      <div className = "left-freq-wrap">
        <h3>Left &nbsp;</h3>

        <Slider
          className = "on-slider"
          value = {leftFreq}
          onChange={(e)=>setLeftFreq(Number(e.target.value))}
          valueLabelDisplay="auto"
          min={20}
          max={1000}
          />

        <MuiInput
          value = {leftFreq}
          size="small"
          sx={{width:"150px"}}
          onChange={e=>setLeftFreq(Number(e.target.value))}
          inputProps={{
            step:1,
            min: 20,
            max: 1000,
            type: 'number',
          }}
          />
      </div>

    <div className = "right-freq-wrap">
      <h3>Right</h3>
      <Slider
      className = "on-slider"
        value = {rightFreq}
        onChange={(e)=>setRightFreq(Number(e.target.value))}
        valueLabelDisplay="auto"
        min={20}
        max={1000}
        />

      <MuiInput
        value={rightFreq}
        size="small"
        sx={{width:"150px"}}
        onChange={(e)=>setRightFreq(Number(e.target.value))}
        inputProps={{
          step:1,
          min: 20,
          max: 1000,
          type: 'number'
        }}
        />
      </div>

      <div className = "bin-controls-wrap">
        <Button variant="contained" onClick = {handleStartStopButton}>{!(leftAudio.playing && rightAudio.playing)? "start" : "stop"}</Button>
        {/* <div className = "switch-wrap">
        <Switch
          checked={syncWithPomo}
          onChange={()=>setSyncWithPomo(prev=>!prev)}
          />
        Sync with Pomodoro
        </div> */}
      </div>

    </div>
  )
}
export default Binaural;