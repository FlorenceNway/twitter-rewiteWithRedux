import React , {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {reactClick} from '../store/twitter.actions';
import { Link, useHistory } from 'react-router-dom';
import API from './API';
import '../style/TweetDetail.scss';
import CreateComment from './CreateComment';
import ReplyComment from './ReplyComment';


const TweetDetail = ({match}) => {

    const id = match.params.id
    const history = useHistory();
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([])
    const [allTweets, setAllTweets] = useState([])
    const [user, setUser] = useState({})
    const [tweet, setTweet] = useState({})
    const [comments, setComments] = useState('')
    const [messageBoxToggle,setMessageBoxToggle] = useState(false)

    useEffect(() => {
        API.getAllUsers().then(allusers => setAllUsers(allusers))
        API.getUser(id).then((eachUser) => setUser(eachUser))
        API.getTweets().then((tweets) => {
                setAllTweets(tweets);
        });
        API.getComments(id).then(tweet => {
            setTweet(tweet)
            setComments(tweet.comments)
        })
       
    },[])

    const backArrowHandler = () => {
        history.push('/tweets')
    }

    const reactsHandler = (id, react) => {
        dispatch(reactClick(id, react, allTweets))  

        const selectedTweet = allTweets.filter(tweet => tweet.id === id)
        API.patchReact(id, {[react]: selectedTweet[0][react]})

        API.getComments(id).then(tweet => {
            setTweet(tweet)
            setComments(tweet.comments)
        })
    }

    const messageIconHandler = () => {
        setMessageBoxToggle(!messageBoxToggle)
        console.log(messageBoxToggle)
    }

    return (
        <div>
            <section className="content bgImage">
                <div className="subTweet">
                  
                    <Link to={`/tweets`}>
                        <div className="backword">
                            <div className="arrowText">
                                <img src={require("../images/backarrow.svg")} alt="backArrow" className="backToTweets" onClick={backArrowHandler}/>
                                <span>Tweet</span>
                            </div>
                        </div>
                    </Link>    
                    <div className="bodyText">
                        <div className="profile">
                            <div className="avatar">
                                <img src={user.avatar_url} alt="avatar"/>
                            </div>
                            <div className="userDetail">
                                <p><b>{user.name}</b></p> 
                                <p>@{user.name}</p>
                            </div>
                        </div>
                        
                        <div className="tweetContent" id={id}>
                            <p>{tweet.content}</p>
                        </div>
                        <div className="like_share">
                            <p><img src={require("../images/heart.svg")} alt="likes" onClick={() => reactsHandler(tweet.id,'likes')}/><span className="like_Btn">{tweet.likes}</span></p>
                            <p><img src={require("../images/retweet.svg")} alt="retweets" onClick={() => reactsHandler(tweet.id,'retweets')}/><span className="retweet_Btn">{tweet.retweets}</span></p>
                            <p ><img src={require("../images/comment.svg")} alt="comments" id="1"/><span className="comment_Btn">{comments.length}</span></p>
                        </div>
                        {messageBoxToggle? <ReplyComment/> : ""}
                    </div>
                    <div> 
                        <h4 className="commentTitle">COMMENTS</h4>
                    </div>
                    <div className="comments">
                        {
                            [...comments].map((comment,index) => {
                                const whoComment = allUsers.filter(user => user.id === comment.userId)
                                
                                return <div className="comment">
                                            <div className="profile">
                                                <div className="avatar">
                                                    <img src={whoComment[0].avatar_url} alt="avatar"/>
                                                </div>
                                                <div className="userDetail">
                                                    <p><b>{whoComment[0].name}</b></p>
                                                    <p>@{whoComment[0].name}</p>
                                                </div>
                                            </div>
                                            <div className="commentText">{comment.content}</div>
                                        </div>
                             })
                        }
                        
                    </div>
                </div>
                    <CreateComment messageIconHandler={messageIconHandler}/>
                </section>
        </div>
    )
}

export default TweetDetail;