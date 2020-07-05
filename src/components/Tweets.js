import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import '../style/Tweet.scss'

const Tweets = () => {
    const dispatch = useDispatch()
    const tweetDetails = useSelector(state => state.tweetDetails)
  
    const {name} = tweetDetails 
    return <div>
                <div class="avatar">
                    <input type='file' class='choose_file'/> 
                </div>
                <div class="userDetail">
                    <p><b>{name}</b></p>
                    <p>@{name}</p>
                    <p>London,UK</p>
                    <p><b>245</b> Followers</p>
                    <p><b>132</b> Followings</p>
                </div>
        
            </div> 

}
export default Tweets;
