
let initialState = {
    tweetDetails : []
}

const tweetDetails = (state = initialState, {type,payload}) => {

    switch(type) {
        case 'LOGIN_CHECK':
            console.log('payload', payload)
            return {...state, tweetDetails: [...state.tweetDetails, ...payload]};

        default:
            return state;
    }
 }
    
export default tweetDetails;