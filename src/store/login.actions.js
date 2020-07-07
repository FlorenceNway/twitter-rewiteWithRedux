
export const saveLoginUser = (userDetails) => ({
    type: 'SAVE_LOGIN_USER',
    payload: userDetails
})

export const likesClick = (id) => ({
    type: 'LIKES_CLICK',
    payload: id
})