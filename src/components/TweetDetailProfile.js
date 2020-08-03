import React, {useState, useEffect} from 'react';
import ReplyComment from "./ReplyComment";


 const TweetDetailProfile = ({
   user,
   tweet,
   tweet_id,
   messageBoxToggle,
   likeBtnClick,
   retweetBtnClick,
   reactsHandler,
   comments,
   setComments,
   replybackArrowHandler,
 }) => {

   return (
     <div className="bodyText">
       <div className="profile">
         <div className="avatar">
           <img src={user && user.avatar_url} alt="avatar" />
         </div>
         <div className="userDetail">
           <p> <b>{user && user.name}</b> </p>
           <p>@{user && user.name}</p>
         </div>
       </div>

       <div className="tweetContent" id={tweet_id}>
         <p>{tweet.content}</p>
       </div>
       <div className="like_share">
         <p>
           <img src={ likeBtnClick
                 ? require("../images/filledHeart.svg")
                 : require("../images/heart.svg")
             }
             alt="likes"
             onClick={() => reactsHandler(tweet.id, "likes")}
           />
           <span className="like_Btn">{tweet.likes}</span>
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
           <span className="retweet_Btn">{tweet.retweets}</span>
         </p>
         <p>
           <img src={require("../images/comment.svg")} alt="comments" id="1" />
           <span className="comment_Btn">{comments.length}</span>
         </p>
       </div>

       {/* {messageBoxToggle? <ReplyComment comment={comment} commentHandler={commentHandler} replyHandler={replyHandler} replybackArrowHandler={replybackArrowHandler}/> : ""} */}
       {messageBoxToggle ? (
         <ReplyComment
           userId={user.id}
           tweetId={tweet.id}
           comments={comments}
           setComments={setComments}
           replybackArrowHandler={replybackArrowHandler}
         />
       ) : (
         ""
       )}
     </div>
   );
 };

export default TweetDetailProfile;

