import React from 'react';
import API from './API';

import '../style/ReplyComment.scss';

const ReplyComment = ({tweetId, userId}) => {
    
    const replyHandler = () =>{
        console.log('reply',tweetId, userId)
       
    }

    return <div className="commentBox">
                <textarea className='commentTextarea' placeholder='Your Comment'></textarea>
                <div className='tweetBtnArea'>
                    <img className='bakArow' src={require('../images/backarrow.svg')} alt="backArrow"/>
                    <button className='replyBtn' onClick={replyHandler}>Reply</button>
                </div>
            </div>       
    
}

export default ReplyComment;