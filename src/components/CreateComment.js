import React, {useState} from 'react'

const messageIconHandler = () => {
    
}

 const CreateComment = () => {
    return (
        <img className="messageBtn" src={require('../images/createNewMessage.png')} onClick={messageIconHandler}/>
    )
}

export default CreateComment;