import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { GetAllUnfollowed } from "../Follow/GetAllUnfollowed";

export const RightBar = () => {

    
    return (
        <div className="RightBar-holder">
            what's Happening
            <div className="unfollowed - list">
                <GetAllUnfollowed />
            </div>
        </div>

    )
}