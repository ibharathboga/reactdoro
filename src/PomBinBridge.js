import React, { useEffect } from 'react'

function PomBinBridge({pomref,binref}) {

    useEffect(()=>{
        if(!binref.current) return;
        binref.current.handleBinauralStop();
    },[])

    return (null);
}
export default PomBinBridge;