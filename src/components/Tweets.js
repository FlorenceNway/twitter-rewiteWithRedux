import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {reactClick} from '../store/twitter.actions';
import { Link } from 'react-router-dom';
import ReplyComment from './ReplyComment';
import API from './API';
import '../style/Tweet.scss'

const Tweets = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [allUsers, setAllUsers] = useState([])
    const [allTweets, setAllTweets] = useState([])
    const [clickReply, setClickReply] = useState(false)
    const [selectedTweet, setSelectedTweet] = useState([])
    const [likeBtnClick, setLikeBtnClick] = useState(false);
    const [retweetBtnClick, setRetweetBtnClick] = useState(false);
    const userDetails = useSelector((state) => state.userDetails);
    const commentDetails = useSelector((state) => state.commentDetails);
    const tweetDetails = useSelector((state) => state.tweetDetails);
    

    useEffect(() => {
      if(tweetDetails) {
        setLikeBtnClick(tweetDetails.like)
        setRetweetBtnClick(tweetDetails.retweet)
      }
    }, [])

    useEffect(() => {
      if (!userDetails.length) {
        history.push("/");
      } else {
        API.getAllUsers().then((users) => {
          setAllUsers(users);
        });
        API.getTweets().then((tweets) => {
          let alltweets = tweets.sort((a, b) => {
            let a_chunks = a.date.split("/");
            let b_chunks = b.date.split("/");
            const a_formattedDate =
              a_chunks[1] + "/" + a_chunks[0] + "/" + a_chunks[2];
            const b_formattedDate =
              b_chunks[1] + "/" + b_chunks[0] + "/" + b_chunks[2];

            return new Date(b_formattedDate) - new Date(a_formattedDate);
          });

          setAllTweets(alltweets);
        });
      }
    }, [commentDetails]);

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
        
        if (react === "likes") setLikeBtnClick(true);
        if (react === "retweets") setRetweetBtnClick(true);
        
        dispatch(reactClick(id, react, allTweets))  

        const selectTweet = allTweets.filter(tweet => tweet.id === id)
        
        setSelectedTweet(selectTweet)
        
        API.patchReact(id, {[react]: selectTweet[0][react]})
        //setSelectedTweet([])
    }

    const commentHandler = () => {
        setClickReply(!clickReply)
    }

    const tweetClickHandler = () => {
        history.push("/createTweet");
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

            <div className='tweets'> {console.log('alltweets', allTweets)}
                {   
                    !allTweets? <div>Loading...</div> :
                    
                    allTweets.map(tweet => {
                        const {id, userId, date, likes, retweets, comments, content} = tweet
                        const users = [...allUsers]
                        const whoTweet = users.filter(user => user.id === userId)
                        let whoTweetName;
                        if(whoTweet) {
                            whoTweetName = whoTweet[0] && whoTweet[0].name
                        }
                    
                    return (
                      <div className="tweet">
                        <div className="user_data">
                          <p>{whoTweetName}</p>
                          <p>{date}</p>
                        </div>
                        <Link to={`/tweet/${tweet.id}`}>
                          <div className="tweetContent">
                            <p>{content}</p>
                          </div>
                        </Link>
                        <div className="like_share">
                          <p>
                            <img src={
                                likeBtnClick
                                  ? require("../images/filledHeart.svg")
                                  : require("../images/heart.svg")
                              }
                              alt="likes"
                              onClick={() => reactsHandler(tweet.id, "likes")}
                            />
                            <span className="like_Btn">{likes}</span>
                          </p>
                          <p>
                            <img src={
                                retweetBtnClick
                                  ? require("../images/colorRetweet.svg")
                                  : require("../images/retweet.svg")
                              }
                              alt="retweets"
                              onClick={() => reactsHandler(tweet.id, "retweets")}
                            />
                            <span className="retweet_Btn">{retweets}</span>
                          </p>
                          <p id={whoTweet[0] && whoTweet[0].id}>
                            <img src={require("../images/comment.svg")}
                              alt="comments"
                              onClick={() => commentHandler()}
                            />
                            <span className="comment_Btn"> {comments.length} </span>
                          </p>
                        </div>
                        {clickReply ? (
                          <ReplyComment
                            tweetId={tweet.id}
                            userId={userId}
                            comments={comments}
                            replybackArrowHandler={commentHandler}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                           
                            
                })}
               <img src={require("../images/newtweet.png")} className="navigateTweetBtn" onClick={tweetClickHandler} alt="tweetBtn"></img>
            </div>
            
        </div> : ("") 
}

export default Tweets;
