import React, {useState} from 'react';
import API from './API';

import {useDispatch} from 'react-redux';
import '../style/ReplyComment.scss';

const ReplyComment = ({commentHandler, replyHandler, replybackArrowHandler, comment}) => {

    //const dispatch = useDispatch();
    // const [comment , setComment] = useState("");

    // const commentHandler = (e) => {
    //     setComment(e.target.value)
    // }

    // const replyHandler = () =>{
    //     const newComment = comment
    //     API.postComment(userId, tweetId, newComment)
    //     setComment("")
    //     dispatch(commentClick(userId, tweetId, comments, newComment))
    // }

    return <div className="commentBox">
                <textarea className='commentTextarea' placeholder='Your Comment' value={comment} onChange={commentHandler}></textarea>
                <div className='tweetBtnArea'>
                    <img className='bakArow' src={require('../images/backarrow.svg')} alt="backArrow" onClick={replybackArrowHandler}/>
                    <button className='replyBtn' onClick={replyHandler}>Reply</button>
                </div>
            </div>       
    
}

export default ReplyComment;