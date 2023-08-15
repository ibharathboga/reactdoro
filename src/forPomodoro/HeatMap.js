import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

import Tooltip from '@mui/material/Tooltip';

import '../app.scss';
import './pomodoro.scss';
import OptionsComponent from './OptionsComponent';

function HeatMap(props,ref) {

  const [durationColor, setDurationColor] = useState("");
  const [streaks, setStreaks] = useState([{dv:"00:00 mins",tv:"⚪"}]);

  //to persist on refresh
  useEffect(()=>{
    const stored_streaks = JSON.parse(localStorage.getItem("localStreaks"));
    setStreaks(stored_streaks);
  },[])
  useEffect(()=>{
      localStorage.setItem("localStreaks",JSON.stringify(streaks));
  },[streaks])

    
  const handleTrackType = (e) => {
    // console.log("handleTrackType invoked. " + e);
    setDurationColor(e);
  }
  const handleUndoStreak = () => {
    // console.log("handleUndoStreak is invoked");
    setStreaks(prev=>prev.slice(0,-1));
  }
  const handleAddType = (dv) => {
    dv = `${Math.floor(dv/60).toString().padStart(2, '0')} : ${(dv%60).toString().padStart(2, '0')} mins`
    setStreaks(prev=>[...prev,{dv:dv,tv:durationColor}]);
  }
  useImperativeHandle(ref,()=> ({handleAddType}))

  return (
    <div className = "heatmap-wrap">
    <OptionsComponent toTrackType = {(e)=>handleTrackType(e)} toResetStreak = {()=>setStreaks([])} toUndo = {handleUndoStreak}/>
    <div className = "heatmap-grid">
      <h3>Streak Track</h3>
        {
          streaks.map((streakItem,index) => {
            return(
              <Tooltip title={`${streakItem.dv}`} placement="top" key ={index}>
                <span key = {index}>{streakItem.tv}</span>
              </Tooltip>
            )
          })
        }
    </div>
    </div>
  )
}
export default forwardRef(HeatMap);