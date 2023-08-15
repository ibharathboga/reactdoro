import React from 'react'

import Link from '@mui/material/Link';
import './about.scss';
export default function About() {
  return (
    <div className="about-wrapper">
      <h2>About</h2>
      <p>Welcome to my personal project! Here, I've crafted a productive space that brings together a Todo List, Pomodoro Timer, and Binaural Beats to enhance your productivity and relaxation.</p>
      
      <p>What I've Learned: 
        <ul>
          <li>How to use <Link href = "https://react.dev/reference/react">React Hooks</Link> (useState, useEffect, useRef, forwardRef ...)</li>
          <li>How to create my own react user components</li>
          <li>How to use <Link href = "https://mui.com/material-ui/getting-started/#introduction">MUI library</Link></li>
          <li>How to use persist state on refresh</li>
          <li>Using <Link href = "https://www.npmjs.com/package/react-beautiful-dnd">react-beautiful-dnd</Link></li>
          <li>Using <Link href = "https://www.npmjs.com/package/react-sound">react-sound</Link></li>
          <li>Using <Link href = "https://www.npmjs.com/package/react-push-notification">react-push-notification</Link></li>
        </ul>
      </p>
      
      <p>I would like to express my sincere gratitude to the individuals whose contributions have played an integral role in the development of ReactDoro. Their contributions have made a significant impact on my learning journey, and I am deeply appreciative of the knowledge and inspiration provided by them.</p>

      <p>References</p>
        <ul>
          <li><Link href = "https://youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3">ReactJS Tutorial Codevolution</Link></li>
          <li><Link href = "https://youtu.be/YJ5EMzyimfc">Drag and Drop with react-beautiful-dnd</Link></li>
          <li><Link href = "https://youtu.be/_DQIKm6Zxvw">Passing Child Functions to Parent Component in React js useRef forwardRef useImperativeHandle</Link></li>
          <li><Link href = "https://youtu.be/1Hh4tjnoqDM">Send Push Notification in React js</Link></li>
          <li><Link href = "https://youtu.be/86-DUfx16-A">Persist State on Page Reload</Link></li>
          <li>and a number of challenges and errors that i have solved using Stackoverflow</li>
        </ul>
    </div>
  )
}
