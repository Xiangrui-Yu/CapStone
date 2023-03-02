import React, { useEffect, useState,useRef,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadAllTweets } from '../../store/tweets'
import { UserBlock } from '../Blocks/UserBlock'
import { FooterBlock } from '../Blocks/FooterBlock'
import './tweets.css'

export const AllTweets = () => {
    const dispatch = useDispatch();
    
    const tweetsObj = useSelector(state => state?.tweets)
    const tweets = Object.values(tweetsObj).sort((a, b) => b.id - a.id)
    
    const tweetLikes = useMemo(() => tweets.map(tweet => tweet.likes));

    useEffect(() => {
        dispatch(loadAllTweets())
    }, [dispatch])

    return (
        <>
            <div className='post-body-holder'>
                {tweets && tweets?.map(tweet => {
                    return (
                        <div key={tweet.id} className='tweet-container'>
                            {/* <Link to={`/users/${tweet.user.id}`} className='link-details'> */}
                                <UserBlock userData={tweet.user} id={tweet.id} />

                            {/* </Link> */}

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