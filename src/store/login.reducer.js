
let initialState = {
    userDetails: [],
    tweetDetails : [],
    commentDetails: []
}

const tweetDetails = (state = initialState, {type,payload}) => {

    switch(type) {
        case 'SAVE_LOGIN_USER':
            console.log('payload', payload)
            return {...state, userDetails: [...state.userDetails, ...payload]};
        case 'REACT_CLICK':
            const {id, react, tweets} = payload
            const selectedTweet = tweets.filter(tweet => tweet.id === id)
            selectedTweet[0][react] = parseInt(selectedTweet[0][react]) + 1
            return {...state, tweetDetails: [...tweets]};
            
        default:
            return state;
    }
 }
    
export default tweetDetails;