import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {reactClick} from '../store/twitter.actions';
import { Link } from 'react-router-dom';
import ReplyComment from './ReplyComment';
import API from './API';
import '../style/Tweet.scss'

const Tweets = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [allUsers, setAllUsers] = useState([])
    const [allTweets, setAllTweets] = useState([])
    const [clickReply, setClickReply] = useState(false)
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
                //let alltweets = tweets.sort((a,b) => console.log(Math.abs(new Date(a.date) - new Date(b.date)))
                const alltweets = tweets.sort((a, b) => {
                    var c = new Date(a.date).getTime();
                    var d = new Date(b.date).getTime();
                    console.log(a.date, b.date, c , d)
                    return c-d;
                }
                )
                setAllTweets(alltweets);
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

//When like and retweet buttons are clicked, render update and db update
    const reactsHandler = (id, react) => {
        dispatch(reactClick(id, react, allTweets))  

        const selectedTweet = allTweets.filter(tweet => tweet.id === id)
        API.patchReact(id, {[react]: selectedTweet[0][react]})

        API.getTweets().then((tweets) => {
            let alltweets = tweets.sort((a,b) => b.date - a.date)
            setAllTweets(alltweets);
        });
    }

    const commentHandler = (id) => {
        setClickReply(!clickReply)
    }

    const tweetClickHandler = () => {
        history.push("/writeTweet");
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
                {   
                    allTweets.map(tweet => {
                    const {userId, date, likes, retweets, comments, content} = tweet
                    const whoTweet = allUsers.filter(user => user.id === userId)
                    const whoTweetName = whoTweet[0].name
                    
                    return   <div className='tweet'>
                                <div className='user_data'>
                                    <p>{whoTweetName}</p>
                                    <p>{date}</p>
                                </div>
                                <Link to={`/tweet/${tweet.id}`}>
                                    <div className='tweetContent' >
                                        <p>{content}</p>
                                    </div>
                                </Link>
                                <div className='like_share'>
                                    <p><img src={require('../images/heart.svg')} alt='likes' onClick={() => reactsHandler(tweet.id,'likes')}/><span className='like_Btn'>{likes}</span></p>
                                    <p><img src={require('../images/retweet.svg')} alt='retweets' onClick={() => reactsHandler(tweet.id,'retweets')}/><span className='retweet_Btn'>{retweets}</span></p>
                                    <p id={whoTweet[0].id}><img src={require('../images/comment.svg')} alt='comments' onClick={() => commentHandler(tweet.id)}/><span className='comment_Btn'>{comments.length}</span></p> 
                                </div>
                                {clickReply? <ReplyComment id={tweet.id}/>: ""}
                            </div>
                           
                            
                })}
               <img src={require("../images/newtweet.png")} className="navigateTweetBtn" onClick={tweetClickHandler}></img>
            </div>
            
        </div> : ("") 
}

export default Tweets;
