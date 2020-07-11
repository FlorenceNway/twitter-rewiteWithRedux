import React from 'react';


const TweetDetail = () => {
    return (
        <div>
            <section className="content bgImage"><subtweet className="subTweet">
                    <div className="backword">
                        <div className="arrowText">
                            <img src="images/backarrow.svg" alt="backArrow" className="backToTweets"/>
                            <span>Tweet</span>
                        </div>
                    </div>
                    <div className="bodyText">
                        <div className="profile">
                            <div className="avatar">
                                <img src="" alt=""/>
                            </div>
                            <div className="userDetail">
                                <p><b>Savanna Schulist</b></p>
                                <p>@savannaschulist</p>
                            </div>
                        </div>
                        
                        <div className="tweetContent" id="1">
                            <p>Lip-Sync for Your Life</p>
                        </div>
                        <div className="like_share">
                            <p><img src={require("../images/heart.svg")} alt="likes" id="1"/><span className="like_Btn">95</span></p>
                            <p><img src={require("../images/retweet.svg")} alt="retweets" id="1"/><span className="retweet_Btn">40</span></p>
                            <p id="1"><img src={require("../images/comment.svg")} alt="comments" id="1"/><span className="comment_Btn">1</span></p>
                        </div>
                    </div></subtweet><div> <h4 className="commentTitle">COMMENTS</h4></div><div className="comments"><div className="comment">
                                <div className="profile">
                                    <div className="avatar">
                                        <img src="" alt=""/>
                                    </div>
                                    <div className="userDetail">
                                        <p><b>Elbert Beer</b></p>
                                        <p>@Elbert Beer</p>
                                    </div>
                                </div>
                                <div className="commentText">Shante, Shante, Shante</div>
                            </div></div><img className="messageBtn" src={require('../images/createNewMessage.png')}/></section>
        </div>
    )
}

export default TweetDetail;