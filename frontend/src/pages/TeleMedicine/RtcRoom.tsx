import React, { useState } from 'react'
import shortId from 'shortid'
import '../../helpers/styles/room.css'

const goToRoom = (history, roomId) => {
    history.push(`/TeleMedicine/${roomId}`)
}


const RtcRoom = ({history}) => {
    let [roomId, setRoomId] = useState("");
    
    return (

        <div className="room-wrapper">
        <div className="enter-room-container">
        <form>
            <input type="text" value={roomId} placeholder="Room id" onChange={(event) => {
                setRoomId(event.target.value)
            }}/>
            <button onClick={() => {
                goToRoom(history, roomId)
                console.log(JSON.stringify(history))
            }}>Enter</button>
        </form>
    </div>
    </div>

            )
}

export default RtcRoom