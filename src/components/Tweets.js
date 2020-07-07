import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import API from './API';
import '../style/Tweet.scss'

const Tweets = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [allUsers, setAllUsers] = useState([])
    const [allTweets, setAllTweets] = useState([])
    const tweetDetails = useSelector(state => state.tweetDetails)

    useEffect(() => {
        if (!tweetDetails.length) {
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
                //const file = file_input.files[0]
                console.log('file', file_input)
                const reader  = new FileReader();

                reader.onload = (e) => {
                    avatar_div.style.backgroundImage = `url(${e.target.result})`
                    avatar_div.style.backgroundSize = 'cover'   
                }
                reader.readAsDataURL(file_input);     
         }
    }
  
    return tweetDetails.length !== 0 ? <div className='content'>
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
                                    <p><img src={require('../images/heart.svg')} alt='likes' id={tweet.id}/><span className='like_Btn'>{likes}</span></p>
                                    <p><img src={require('../images/retweet.svg')} alt='retweets' id={tweet.id}/><span className='retweet_Btn'>{retweets}</span></p>
                                    <p id={whoTweet[0].id}><img src={require('../images/comment.svg')} alt='comments'id={tweet.id}/><span className='comment_Btn'>{comments.length}</span></p> 
                                </div>
                            </div>
                })}
               
            </div>
            
        </div> : ("") 

}
export default Tweets;
