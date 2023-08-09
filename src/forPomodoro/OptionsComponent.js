import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Button from '@mui/material/Button';

import '../app.scss';
import './pomodoro.scss';
function OptionsComponent({toTrackType,toResetStreak,toUndo}) {

    const types = [
        {name:"Pomodoro",value:"🟢"},
        {name:"Short Break",value:"🔵"},
        {name:"Long Break",value:"🟡"},
        {name:"Other",value:"⚪"}
    ]

    const [type,setType] = useState("🟢");

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    useEffect(()=>{
        toTrackType(type);
    },[type,toTrackType])
    return (
    <div className='options-wrap'>
        <FormControl>
        <FormLabel>⏲  &nbsp;Duration Type</FormLabel>
        <RadioGroup row value = {type} onChange = {handleTypeChange}>
            {
                types.map((type,index)=>{ return(
                    <FormControlLabel 
                    sx={{marginRight:"30px"}} 
                        key = {`option-${index}`}
                        value={type.value}
                        control={<Radio />}
                        label={type.name}
                        labelPlacement="end"
                    />
                    )})
            }

            <FormControlLabel
            //  sx={{margin:"auto 10px"}} 
                control ={<Button onClick = {toUndo}>undo</Button>}        
            />

            <FormControlLabel 
            // sx={{margin:"auto 10px"}} 
                control ={<Button onClick = {toResetStreak}>reset streak</Button>}        
            />
        </RadioGroup>
        </FormControl>
    </div>
    )
}

export default OptionsComponent
