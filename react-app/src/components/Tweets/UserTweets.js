import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { loadAllTweets } from '../../store/tweets'
import { UserBlock } from '../Blocks/UserBlock'
import { FooterBlock } from '../Blocks/FooterBlock'
import { getUserTweets } from '../../store/tweets'
import './tweets.css'

export const UserTweets = ({userId}) => {
    const dispatch = useDispatch()
    const tweetsObj = useSelector(state => state?.tweets)
    const tweets = Object.values(tweetsObj).sort((a, b) => b.id - a.id);




    useEffect(() => {
        dispatch(getUserTweets(userId))
    }, [dispatch, userId])
    return (
        <>
            <div className='post-body-holder'>
                {tweets && tweets?.map(tweet => {
                    return (
                        <div key={tweet.id} className='tweet-container'>
                            <UserBlock userData={tweet.user} id={tweet.id} />

                            <Link to={`/tweets/${tweet.id}`} className='link-details'>
                                <div className='post-body'>{tweet.body}</div>
                            </Link>
                            <FooterBlock like={tweet.likes} retweet={tweet.retweets} tweetId={tweet.id} />
                        </div>
                    )
                })}
            </div>

        </>
    )

}