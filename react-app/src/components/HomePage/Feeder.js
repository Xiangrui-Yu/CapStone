import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AllTweets } from "../Tweets/AllTweets";
import { AddT } from "../Tweets/AddT";

export const Feeder = () => {


    return (
        <div className="Feeder-holder">
            <h2 style={{fontSize:"20px"}}>Home</h2>
            <AddT />
            <AllTweets />
        </div>
    )
}