import React, {useState} from 'react';
import API from './API';

import '../style/ReplyComment.scss';

const ReplyComment = ({tweetId, userId, replybackArrowHandler}) => {

    const [comment , setComment] = useState("")

    const commentHandler = (e) => {
        setComment(e.target.value)
    }

    const replyHandler = () =>{
        const newComment = comment
        API.postComment(userId, tweetId, newComment)
    }

    return <div className="commentBox">
                <textarea className='commentTextarea' placeholder='Your Comment' value={comment} onChange={commentHandler}></textarea>
                <div className='tweetBtnArea'>
                    <img className='bakArow' src={require('../images/backarrow.svg')} alt="backArrow" onClick={replybackArrowHandler}/>
                    <button className='replyBtn' onClick={replyHandler}>Reply</button>
                </div>
            </div>       
    
}

export default ReplyComment;