import React from 'react'
import '../style/CreateTweet.scss'
import { useHistory } from "react-router-dom";

 const CreateTweet = () => {
    const history = useHistory();

    const backArrowClickHandler = () => {
        history.push("/Tweets");
    }

    return (
        <div className="backgroundImage">
            <div className="tweetAsUwish">
                    <div className='navigateArea'>
                        <img src={require('../images/tweetBackArrow.svg')} alt="backArrow" className='backtotweets' onClick={backArrowClickHandler}/>
                        <button className='createNewTweetBtn'>Tweet</button>
                    </div>
                    <div className='tweetText'>
                        <textarea name="tweet" cols="30" rows="9" placeholder="What's on your mind"></textarea>
                    </div>
            </div>
        </div>
    )
}

export default CreateTweet;