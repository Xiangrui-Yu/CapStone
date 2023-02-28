import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ReplyByUser} from './Replies/ReplyByUser'
import { UserTweets } from './Tweets/UserTweets'


export const Userpage =() => {
    const { userId } = useParams()

    return(
        <>

            <UserTweets userId={userId}/>

        </>
    )
}