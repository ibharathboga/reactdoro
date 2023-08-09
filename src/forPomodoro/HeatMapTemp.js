import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

import '../app.scss';
import './pomodoro.scss';
import OptionsComponent from './OptionsComponent';

function HeatMapTemp() {

  const [durationColor, setDurationColor] = useState("");
  const [streaks, setStreaks] = useState("🟢🟢🟢🟢🟢🟢🟢")

  
  const handleTrackType = (e) => {
    console.log("handleTrackType invoked. " + e);
    setDurationColor(e);
  }
  const handleUndoStreak = () => {
    console.log("handleUndoStreak is invoked");
    setStreaks(prev=>prev.slice(0, -2));
  }
  
  const handleAddType = () => {
    setStreaks(prev=> prev + durationColor)  
    console.log("handleAddType - HeatMapTemp.js - invoked")
  }

  return (
    <div className = "heatmap-wrap">
    <OptionsComponent toTrackType = {(e)=>handleTrackType(e)} toResetStreak = {()=>setStreaks("")} toUndo = {handleUndoStreak}/>
    <div className = "heatmap-grid">
      <h3>Streak Track</h3>
        {streaks}
      <button onClick = {handleAddType}>add type</button>
    </div>
    </div>
  )
}

export default HeatMapTemp;