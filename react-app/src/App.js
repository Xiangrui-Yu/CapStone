import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/HomePage/Navigation";
import {Feeder} from "./components/HomePage/Feeder";
import { RightBar } from "./components/HomePage/RightBar";
import { TweetDetails } from "./components/Tweets/TweetDetails";
import "./index.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  

  return (
    <div className="app">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/tweets/:tweetId">
            <TweetDetails />
          </Route>

          <Route path="">
            <Feeder />
          </Route>

        </Switch>
      )}
      <RightBar />
    </div>
  );
}

export default App;
