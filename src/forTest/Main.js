import React, { useEffect } from 'react';

import {useRef} from 'react';
import {useState} from 'react';

import One from './One';
import Two from './Two';

import './main.scss';
function Main() {

    const oneref = useRef(null);
    const tworef = useRef(null);

    const handleMainOne = () => {
        if(!oneref.current) console.log("oneref not present in main");
        oneref.current.handleClickOne();
        console.log("isOneTrue: " + oneref.current.isOneTrue);
    }
    const handleMainTwo = () => {
        if(!tworef.current) console.log("tworef not present in main");
        tworef.current.handleClickTwo();
    }

    useEffect(()=>{
        console.log("useEffect from main invoked. isOneTrue Changed")
    },[oneref.current.isOneTrue])

  return (
    <div className='main-wrap'>
      <h1>Hello World from Main</h1>
      <One ref = {oneref}/>
      <Two ref = {tworef}/>

      <button onClick = {handleMainOne}>Main One</button>
      <button onClick = {handleMainTwo}>Main Two</button>

    </div>
  )
}

export default Main
