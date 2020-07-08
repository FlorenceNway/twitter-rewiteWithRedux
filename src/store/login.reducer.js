
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

            // const localUserDetails = [...state.userDetails[0].tweets]    
            // const selectedTweet = localUserDetails.filter(localTweet => localTweet.id === payload)
            // selectedTweet[0].likes = parseInt(selectedTweet[0].likes) + 1
            // console.log(localUserDetails, [...state.userDetails[0].tweets])
            // return {...state, userDetails: [...state.userDetails, ...localUserDetails]};
            
        default:
            return state;
    }
 }
    
export default tweetDetails;