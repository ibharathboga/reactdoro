import React, { useEffect, useState, useRef } from 'react'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import '../app.scss';
import './pomodoro.scss';
const TimerComponent = ({limit,onReachZero,toChangeLimit,binauralRef}) => {

    const [sec,setSec] = useState(limit);
    const timeref = useRef(0);
    const [hasStarted,setStarted] = useState(false);

    const parse_sec = (sec) => {
        return `${Math.floor(sec/60).toString().padStart(2, '0')} : ${(sec%60).toString().padStart(2, '0')}`
    }
    const handleStart = () => {
        if(sec === 0) return;

        // console.log("start invoked")
        setStarted(true);
        
        timeref.current = setInterval(()=>{
            setSec(prev=>prev-1);
        },1000)
    }
    const handleStop = () => {
        // console.log("stop invoked");
        setStarted(false);
        
        clearInterval(timeref.current);
    }
    const handleReset = () => {
        // console.log("reset invoked");
        setSec(limit);
    }

    //on reaching zero
    useEffect(()=>{
        if(sec !== 0) return;

        //run only when sec gets to zero.
        // console.log("sec reached zero");
        handleStop();
        setSec(limit);
        onReachZero();
    },[sec,onReachZero,limit])
    
    //on change of limit
    useEffect(()=>{
        // console.log("limit change invoked");
        handleStop();
        setSec(limit);
    },[limit])

    //to handle binaural audio
    useEffect(()=>{
        if(binauralRef.current === null) return;

        if (hasStarted === true){
            binauralRef.current.handleBinauralStart();
        }
        else if (hasStarted === false){
            binauralRef.current.handleBinauralStop();
        }
    },[hasStarted,binauralRef])

    

    return (
    <div className = "timer-component-wrap">

        <h1 id="count-down">
            {parse_sec(sec)}
        </h1>

        <ButtonGroup variant="outlined" className = 'controls'>
            {
                !hasStarted
                ?<Button onClick = {handleStart}>Start</Button>
                :<Button onClick = {handleStop}>Stop</Button>
            }
            <Button onClick = {handleReset}>Reset</Button>
            <Button onClick = {toChangeLimit}>Settings</Button>
        </ButtonGroup>

    </div>
  )
}
export default TimerComponent;