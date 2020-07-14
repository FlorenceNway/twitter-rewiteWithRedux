import React from 'react';
import Login from './components/Login';
import Tweets from './components/Tweets';
import Tweet from './components/TweetDetail';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateTweet from './components/CreateTweet';

function App() {

  return (
    <div className="App"> 
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/tweets" component={Tweets}/>
          <Route exact path="/tweet/:id" component={Tweet}/>
          <Route exact path="/writeTweet" component={CreateTweet}/>
        </Switch>
      </Router> 
        
    </div>
  );
}

export default App;
