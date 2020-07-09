import React from 'react'

const ReplyComment = () => {
    return (<>
            <textarea className='commentTextarea' placeholder='Your Comment'></textarea>
            <div className='tweetBtnArea'>
                <img className='bakArow' src={require('../images/backarrow.svg')} alt="backArrow"/>
                <button className='replyBtn'>Reply</button>
            </div>
         </>       
    )
}

export default ReplyComment;