import React from 'react';

import {useState} from 'react';
import {useRef} from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

import './main.scss';
function Two(props,ref) {

  const [isTwoTrue,setIsTwoTrue] = useState(false);

    const handleClickTwo = () => {
        console.log("handleClickTwo invoked");
    }
    useImperativeHandle(ref,()=>({handleClickTwo}))

  return (
    <div className="two-wrap">
      <h1>Hello from Two.js</h1>
      <button onClick = {handleClickTwo}>Twooooooo</button>
    </div>
  )
}

export default forwardRef(Two);
