import React, { useEffect } from 'react';

import {useState} from 'react';

import {useRef} from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

import './main.scss';
function One(props,ref) {

    const [isOneTrue,setIsOneTrue] = useState(false);

    const handleClickOne = () => {
        console.log("handleClickOne invoked");
    }
    const handleToggleOne = () => {
      console.log("handleToggleOne invoked");
      setIsOneTrue(prev=>!prev);
    }
    
    useImperativeHandle(ref,()=>({handleClickOne,isOneTrue}))

  return (
    <div className = "one-wrap">
        <h1>Hello from One.js</h1>
        <button onClick = {handleClickOne}>Oneeeeeee</button>
        <button onClick = {handleToggleOne}>Toggle One</button>
    </div>
  )
}

export default forwardRef(One);
