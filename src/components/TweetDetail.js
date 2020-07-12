import React , {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import API from './API';
import '../style/TweetDetail.scss';


const TweetDetail = ({match}) => {

    const id = match.params.id
    const [tweet, setTweet] = useState({})
    const userDetails = useSelector(state => state.userDetails)

    useEffect(() => {
        API.getSubTweet(id).then(eachTweet => setTweet(eachTweet))
       
    },[])
    console.log('tweet', tweet)
    console.log('tweet comment', tweet.comments)
    console.log('tweet user', tweet.user)
    return (
        <div>
            <section className="content bgImage">
                <div className="subTweet">
                    <Link to={`/tweets`}>
                        <div className="backword">
                            <div className="arrowText">
                                <img src={require("../images/backarrow.svg")} alt="backArrow" className="backToTweets"/>
                                <span>Tweet</span>
                            </div>
                        </div>
                    </Link>    
                    <div className="bodyText">
                        <div className="profile">
                            <div className="avatar">
                                <img src="" alt=""/>
                            </div>
                            <div className="userDetail">
                                <p><b>{}</b></p>
                                <p>@{}</p>
                            </div>
                        </div>
                        
                        <div className="tweetContent" id={id}>
                            <p>{tweet.content}</p>
                        </div>
                        <div className="like_share">
                            <p><img src={require("../images/heart.svg")} alt="likes" id="1"/><span className="like_Btn">{tweet.likes}</span></p>
                            <p><img src={require("../images/retweet.svg")} alt="retweets" id="1"/><span className="retweet_Btn">{tweet.retweets}</span></p>
                            <p id="1"><img src={require("../images/comment.svg")} alt="comments" id="1"/><span className="comment_Btn">{}</span></p>
                        </div>
                    </div>
                    <div> 
                        <h4 className="commentTitle">COMMENTS</h4>
                    </div>
                    <div className="comments">
                        <div className="comment">
                            <div className="profile">
                                <div className="avatar">
                                    <img src="" alt=""/>
                                </div>
                                <div className="userDetail">
                                    <p><b>Elbert Beer</b></p>
                                    <p>@Elbert Beer</p>
                                </div>
                            </div>
                            <div className="commentText">{'content'}</div>
                        </div>
                    </div>
                </div>
                    <img className="messageBtn" src={require('../images/createNewMessage.png')}/>
                </section>
        </div>
    )
}

export default TweetDetail;