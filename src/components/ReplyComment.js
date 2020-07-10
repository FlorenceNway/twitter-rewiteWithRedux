import React from 'react';
import '../style/ReplyComment.scss';

const ReplyComment = ({id}) => {
    return (<div className="commentBox" id={id}>
            <textarea className='commentTextarea' placeholder='Your Comment'></textarea>
            <div className='tweetBtnArea'>
                <img className='bakArow' src={require('../images/backarrow.svg')} alt="backArrow"/>
                <button className='replyBtn'>Reply</button>
            </div>
         </div>       
    )
}

export default ReplyComment;