import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ReplyByUser} from './Replies/ReplyByUser'
import { UserTweets } from './Tweets/UserTweets'
import TwitterPic from"../Twitter.png"
import './UserPage.css'


export const Userpage =() => {
    const currentUserId = useSelector(state => state.session.id)
    const { userId } = useParams()

    return(
        <div className='user-page-holder'>

            <img className="userpage-img" src={TwitterPic} alt="Twitter Logo"></img>


            <UserTweets userId={userId}/>

        </div>
    )
}