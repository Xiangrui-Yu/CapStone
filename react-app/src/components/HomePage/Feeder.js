import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AllTweets } from "../Tweets/AllTweets";

export const Feeder = () => {


    return (
        <div className="Feeder-holder">
            <AllTweets />
        </div>
    )
}