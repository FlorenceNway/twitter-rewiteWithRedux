import React,{useState} from 'react';
import '../style/CreateTweet.scss';
import API from './API';
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';

 const CreateTweet = () => {
    const history = useHistory();
    const userDetails = useSelector(state => state.userDetails)
    const [textInput, setTextInput] = useState("")

    const backArrowClickHandler = () => {
        history.push("/Tweets");
    }

    const textInpuHandler = (e) => {
        setTextInput(e.target.value)
    }

    const tweetBtnHandler = () => {
        const id = userDetails[0].id
        API.postTweet(id, textInput)
    }

    return (
        <div className="backgroundImage">
            <div className="tweetAsUwish">
                    <div className='navigateArea'>
                        <img src={require('../images/tweetBackArrow.svg')} alt="backArrow" className='backtotweets' onClick={backArrowClickHandler}/>
                        <button className='createNewTweetBtn' onClick={tweetBtnHandler}>Tweet</button>
                    </div>
                    <div className='tweetText'>
                        <textarea name="tweet" cols="30" rows="9" placeholder="What's on your mind" onChange={textInpuHandler}></textarea>
                    </div>
            </div>
        </div>
    )
}

export default CreateTweet;