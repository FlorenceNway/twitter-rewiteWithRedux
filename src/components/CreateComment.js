import React, {useState} from 'react';


 const CreateComment = ({messageIconHandler}) => {

    return (<>
        <img className="messageBtn" src={require('../images/createNewMessage.png')} onClick={messageIconHandler}/>
        
    </>)
}

export default CreateComment;