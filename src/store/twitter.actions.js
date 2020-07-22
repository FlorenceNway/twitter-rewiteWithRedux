
export const saveLoginUser = (userDetails) => ({
    type: 'SAVE_LOGIN_USER',
    payload: userDetails
})

export const reactClick = (id,react, allTweets) => ({
    type: 'REACT_CLICK',
    payload: {id:id, react:react, tweets:allTweets}
})

export const commentClick = (userId, tweetId, comments, newComment) => ({
    type: 'COMMENT_CLICK',
    payload: {userId:userId, tweetId:tweetId, comments: comments, newComment:newComment}
})