import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import '../style/Tweet.scss'

const Tweets = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const tweetDetails = useSelector(state => state.tweetDetails)

    useEffect(() => {
        if (!tweetDetails.length) {
          history.push("/");
        } 
      }, []);
  
    return tweetDetails.length !== 0 ? (
            <div className='userInfo'>        
                <div className="avatar">
                    <input type='file' className='choose_file' onChange={chooseFileHandler}/> 
                </div>
                    {
                        tweetDetails.map(tweet => (
                            <div className="userDetail">
                                <p><b>{tweet.name}</b></p>
                                <p>@{tweet.name}</p>
                                <p>London,UK</p>
                                <p><b>245</b> Followers</p>
                                <p><b>132</b> Followings</p>
                            </div>
                        ))
                    }
            </div> ): ("") 

}
export default Tweets;
