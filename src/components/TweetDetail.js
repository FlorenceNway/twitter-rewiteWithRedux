import React , {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {reactClick} from '../store/twitter.actions';
import { Link, useHistory } from 'react-router-dom';
import API from './API';
import '../style/TweetDetail.scss';
import CreateComment from './CreateComment';
import TweetDetailProfile from './TweetDetailProfile';


const TweetDetail = ({match}) => {

    const tweet_id = match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [allUsers, setAllUsers] = useState([])
    const [allTweets, setAllTweets] = useState([])
    const [user, setUser] = useState({})
    const [tweet, setTweet] = useState({})
    const [comments, setComments] = useState([])
    const [likeBtnClick, setLikeBtnClick] = useState(false)
    const [retweetBtnClick, setRetweetBtnClick] = useState(false);
    const [messageBoxToggle,setMessageBoxToggle] = useState(false);
    const tweetDetails = useSelector(state => state.tweetDetails)
    const commentDetails = useSelector((state) => state.commentDetails);

    useEffect(() => {
      API.getAllUsers().then((allusers) => setAllUsers(allusers));

      API.getSubTweet(tweet_id).then((tweet) => {
        setUser(tweet.user);
        setTweet(tweet);
        setComments(tweet.comments);
      });
      API.getTweets().then((tweets) => {
        setAllTweets(tweets);
      });
    }, [tweet_id, tweetDetails, commentDetails]);


    const backArrowHandler = () => {
        history.push('/tweets')
    }

    const reactsHandler = (id, react) => {

        dispatch(reactClick(id, react, allTweets)); 
        const selectedTweet = allTweets.filter(tweet => tweet.id === id)
        
        if (react === "likes") setLikeBtnClick(true);
        if (react === "retweets") setRetweetBtnClick(true);
        setTweet(selectedTweet[0]);
        
        API.patchReact(id, {[react]: selectedTweet[0][react]})   
    }

    const reactMsgIconHandler = () => {
        setMessageBoxToggle(!messageBoxToggle)
    }

    const replybackArrowHandler = () => {
        setMessageBoxToggle(false)
    }

    return !user ? (
      <div>Loading...</div>
    ) : (
      <div>
        <section className="content bgImage">
          <div className="subTweet">
            <Link to={`/tweets`}>
              <div className="backword">
                <div className="arrowText">
                  <img
                    src={require("../images/backarrow.svg")}
                    alt="backArrow"
                    className="backToTweets"
                    onClick={backArrowHandler}
                  />
                  <span>Tweet</span>
                </div>
              </div>
            </Link>
            <TweetDetailProfile
              user={user}
              tweet={tweet}
              tweet_id={tweet_id}
              messageBoxToggle={messageBoxToggle}
              likeBtnClick={likeBtnClick}
              retweetBtnClick={retweetBtnClick}
              reactsHandler={reactsHandler}
              comments={comments}
              setComments={setComments}
              replybackArrowHandler={replybackArrowHandler}
            />

            <div>
              <h4 className="commentTitle">COMMENTS</h4>
            </div>
            <div className="comments">
              {[...comments].map((comment) => {
                const users = [...allUsers];

                const whoComment = users.filter(
                  (user) => user.id === comment.userId
                );

                return (
                  <div className="comment">
                    <div className="profile">
                      <div className="avatar">
                        <img
                          src={whoComment[0] && whoComment[0].avatar_url}
                          alt="avatar"
                        />
                      </div>
                      <div className="userDetail">
                        <p>
                          {" "}
                          <b>{whoComment[0] && whoComment[0].name}</b>{" "}
                        </p>
                        <p>
                          {" "}
                          @{whoComment[0] && whoComment[0].name} {comment.date}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="commentText">{comment.content}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <CreateComment messageIconHandler={reactMsgIconHandler} />
        </section>
      </div>
    );
}

export default TweetDetail;