import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';

import TextField from '@mui/material/TextField';

import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';

function TaskItemComponent({desc,onTaskStatusChange,provided}) {

	const [description,setDescription] = useState(desc);
	const [isFinished,setFinished] = useState(false);
	const [timeit,setTimeit] = useState(0);

	//On Edit - to focus on textfield
	const [editToggle,setEditToggle] = useState(false);
	const tfref = useRef(null);
	useEffect(() => {
		if(!editToggle) return;
		tfref.current.focus();
	},[editToggle])
	
	//On Time Track
	const [timeitToggle, setTimeitToggle] = useState(false);
	const timeref = useRef(null);
	const handleStart = () => {
		setTimeitToggle(true);
		
		timeref.current = setInterval(()=>{
			setTimeit(prev => prev + 1);
		},1000)
	}
	const handlePause = () => {
		setTimeitToggle(false);
		
		clearInterval(timeref.current);
		timeref.current = null;
	}
	const handleReset = () => {
		setTimeit(0);
		
		if (!timeitToggle) {
			clearInterval(timeref.current);
			timeref.current = null;
		}
	}

	//on delete 
	const handleDelete = () => {
		clearInterval(timeref.current);
		setFinished(null);
	}
	
	//to track done/undone tasks
	useEffect(()=>{
		onTaskStatusChange(isFinished);
	},[isFinished,onTaskStatusChange])

	return(
		<ListItem 

		ref = {provided.innerRef}
		{...provided.draggableProps}
		{...provided.dragHandleProps}
		
		style={provided.draggableProps.style}
		disablePadding 
		secondaryAction={
			<div style={{ display: editToggle ? 'none' : 'block' }}>
				{
					!timeitToggle?
					<IconButton onClick = {handleStart}>
						<PlayArrowIcon />
					</IconButton>
					:<IconButton onClick = {handlePause}>
						<PauseIcon />
					</IconButton>
				}
				<IconButton size="small" onClick = {() => setFinished(prev => !prev)}>
					<p>{`${Math.floor(timeit/60).toString().padStart(2, '0')} : ${(timeit%60).toString().padStart(2, '0')}`} mins</p>
				</IconButton>
				<IconButton onClick={handleReset}>
					<ReplayIcon />
				</IconButton>

				<IconButton onClick = {handleDelete}>
					<DeleteIcon fontSize='small' />
				</IconButton>
				<IconButton onClick = {() => setEditToggle(toggle=>!toggle)}>
					<EditIcon fontSize='small'/>
				</IconButton>
				<IconButton disableRipple edge="end">
					<FormatLineSpacingIcon />
				</IconButton>
			</div>
		}
	>
			<ListItemButton onClick = {() => setFinished(prev => !prev)} selected={true} >
					<Checkbox edge="start" checked={isFinished ? true : false}/>
					<ListItemText>
							<TextField 
								inputRef = {tfref}
								onChange = {(e) => setDescription(e.target.value)}
								onClick= {(e) => e.stopPropagation()}
								onKeyDown = {(e) => e.key === 'Enter' ? setEditToggle(prev=>!prev) : null}
								value = {description}
								sx={{ display: editToggle ? 'block' : 'none'}}
								fullWidth
								label="Press Enter After Edit" 
								variant="outlined"
								size="small" 
							/>
						{!editToggle && description}
					</ListItemText>
			</ListItemButton>
	</ListItem>
	)
}
export default TaskItemComponent;