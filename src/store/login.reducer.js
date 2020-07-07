
let initialState = {
    userDetails: [],
    tweetDetails : [],
    commentDetails: []
}

const tweetDetails = (state = initialState, {type,payload}) => {

    switch(type) {
        case 'SAVE_LOGIN_USER':
            console.log('payload', payload)
            return {...state, tweetDetails: [...state.tweetDetails, ...payload]};
        case 'LIKES_CLICK':
            const localTweetDetails = [...state.tweetDetails[0].tweets]    
            const selectedTweet = localTweetDetails.filter(localTweet => localTweet.id === payload)
            selectedTweet[0].likes = parseInt(selectedTweet[0].likes) + 1
            console.log(localTweetDetails, [...state.tweetDetails[0].tweets])
            return {...state, tweetDetails: [...state.tweetDetails, ...localTweetDetails]};
            
        default:
            return state;
    }
 }
    
export default tweetDetails;