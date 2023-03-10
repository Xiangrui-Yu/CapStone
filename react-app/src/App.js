import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/HomePage/Navigation";
import { Feeder } from "./components/HomePage/Feeder";
import { RightBar } from "./components/HomePage/RightBar";
import { TweetDetails } from "./components/Tweets/TweetDetails";
import { PostRely } from "./components/Replies/PostReply";
import { LoginPage } from "./components/LogInPage";
import { Userpage } from "./components/UserPage";
import { UserTweets } from "./components/Tweets/UserTweets";
import { ReplyByUser } from "./components/Replies/ReplyByUser";
import { GetAllFollowed } from "./components/Follow/GetAllFollowed";

import "./index.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const authenticated = useSelector(state => state.session.user !== null)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div className="app">
      {authenticated && <Navigation isLoaded={isLoaded} />}
      {authenticated ? (isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/tweets/:tweetId">
            <TweetDetails />
          </Route>
          <Route exact path="/users/:userId/replies">
              <ReplyByUser />
          </Route>

          <Route exact path="/users/:userId">
              <Userpage />
          </Route>
          <Route exact path="/follows/following">
              <GetAllFollowed />
          </Route>



          <Route path="">
            <Feeder />
          </Route>

        </Switch>
      )) : (
        <LoginPage />
      )}
      {authenticated && <RightBar />}
    </div>
  );
}

export default App;
