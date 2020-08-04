
let initialState = {
    userDetails: [],
    tweetDetails : [],
    commentDetails: [],
    selectedTweet: {}
}

const tweetDetails = (state = initialState, {type,payload}) => {

    switch(type) {
        case 'SAVE_LOGIN_USER':
            return {...state, userDetails: [...state.userDetails, ...payload]};
            
        case 'REACT_CLICK':
            console.log('payload', payload)
            const {id, react, tweets} = payload
            const selectedTweet = tweets.filter(tweet => tweet.id === id)
            selectedTweet[0][react] = parseInt(selectedTweet[0][react]) + 1
            return {...state, tweetDetails: [...tweets]};

        case 'COMMENT_CLICK':      
            const d = new Date()
            const yy = d.getFullYear()
            const mm = d.getMonth() + 1
            const dd = d.getDate()
            const {userId, tweetId, comments, newComment} = payload;
            console.log("comment payload", payload); 

            const allComments = comments
            allComments.push({
                userId: userId,
                tweetId: tweetId,
                content: newComment,
                date:`${dd}/${mm}/${yy}`
            })
            return {...state, commentDetails: comments}
            
        default:
            return state;
    }
 }
    
export default tweetDetails;