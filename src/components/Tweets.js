import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {likesClick} from '../store/login.actions';
import API from './API';
import '../style/Tweet.scss'

const Tweets = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [allUsers, setAllUsers] = useState([])
    const [allTweets, setAllTweets] = useState([])
    const userDetails = useSelector(state => state.userDetails)

    useEffect(() => {
        if (!userDetails.length) {
          history.push("/");
        } 
        else {
            API.getAllUsers().then((users) => {
                setAllUsers(users);
            });
            API.getTweets().then((tweets) => {
                setAllTweets(tweets);
            });
        }  
    }, []);
    

    const chooseFileHandler = (e) => {
        const file_input = e.target.files[0];
       
        if(file_input) {
                const avatar_div = document.querySelector('.avatar')
                const reader  = new FileReader();

                reader.onload = (e) => {
                    avatar_div.style.backgroundImage = `url(${e.target.result})`
                    avatar_div.style.backgroundSize = 'cover'   
                }
                reader.readAsDataURL(file_input);     
        }
    }

    const likesHandler = (id) => {
        dispatch(likesClick(id,allTweets))  
    }
  
    return userDetails.length !== 0 ? <div className='content'>
            <div className='userInfo'>        
                <div className="avatar">
                    <input type='file' className='choose_file' onChange={chooseFileHandler}/> 
                </div>    
                <div className="userDetail">
                    <p><b>{userDetails[0].name}</b></p>
                    <p>@{userDetails[0].name}</p>
                    <p>London,UK</p>
                    <p><b>245</b> Followers</p>
                    <p><b>132</b> Followings</p>
                </div>
            </div> 

            <div className='tweets'>
                {allTweets.map(tweet => {
                   
                    const {userId, date, likes, retweets, comments, content} = tweet
                    const whoTweet = allUsers.filter(user => user.id === userId)
                    const whoTweetName = whoTweet[0].name
                    
                    return  <div className='tweet'>
                                <div className='user_data'>
                                    <p>{whoTweetName}</p>
                                    <p>{date}</p>
                                </div>
                                <div className='tweetContent' >
                                    <p>{content}</p>
                                </div>
                                <div className='like_share'>
                                    <p><img src={require('../images/heart.svg')} alt='likes' onClick={() => likesHandler(tweet.id)}/><span className='like_Btn'>{likes}</span></p>
                                    <p><img src={require('../images/retweet.svg')} alt='retweets' id={tweet.id}/><span className='retweet_Btn'>{retweets}</span></p>
                                    <p id={whoTweet[0].id}><img src={require('../images/comment.svg')} alt='comments'id={tweet.id}/><span className='comment_Btn'>{comments.length}</span></p> 
                                </div>
                            </div>
                })}
               
            </div>
            
        </div> : ("") 
}

export default Tweets;
