import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadAllTweets } from '../../store/tweets'
import { UserBlock } from '../Blocks/UserBlock'
import { FooterBlock } from '../Blocks/FooterBlock'

export const AllTweets = () => {
    const dispatch = useDispatch();

    const tweetsObj = useSelector(state => state?.tweets)
    const tweets = Object.values(tweetsObj)

    useEffect(() => {
        dispatch(loadAllTweets())
    }, [dispatch])

    return (
        <>
            <div className='t_header'>
                {tweets && tweets?.map(tweet => {
                    return (
                        <>
                            <UserBlock userData={tweet.user} tweetId= {tweet.id} />
                            <div>{tweet.body}</div>
                            <FooterBlock like = {tweet.likes} retweet ={tweet.retweets} />

                        </>
                    )
                })}

            </div>
        </>
    )
}