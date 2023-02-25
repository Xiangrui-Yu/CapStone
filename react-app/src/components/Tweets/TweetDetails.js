import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadDetailsOfTweet } from "../../store/tweets"
import { UserBlock } from "../Blocks/UserBlock"
import { FooterBlock } from "../Blocks/FooterBlock"
import { PostRely } from "../Replies/PostReply"
import { ReplyHeader } from "../Replies/ReplyHeader"
import { ReplyFooter } from "../Replies/ReplyFooter"
import './tweetDetails.css'

export const TweetDetails = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.loading);



    const { tweetId } = useParams();
    console.log(tweetId)
    const TweetData = useSelector(state => state?.tweets[tweetId])
    console.log(TweetData)

    useEffect(() => {
        dispatch(loadDetailsOfTweet(tweetId))
    }, [dispatch, tweetId])

    if (isLoading) {
        return <p>Loading tweet details...</p>;
    }

    return (
        <div className="Tweet-detail-holder">
            {TweetData && (
                <>
                    <div className="tweet-detail-user">
                        <UserBlock userData={TweetData.user} id={tweetId} />
                    </div>
                    <div className="tweet-detail-body">
                        {TweetData.body}
                    </div>
                    <div className="tweet-detail-footer">
                        <FooterBlock like={TweetData.likes} retweet={TweetData.retweets} tweetId={TweetData.id} />
                    </div>
                    <div className="tweet-detail-reply-post" >
                        <PostRely tweetId={TweetData.id} />
                    </div>
                    <div className="tweet-detail-reply-body">
                        {TweetData && TweetData.replies.sort((a,b) =>b.id-a.id) && TweetData.replies.map(reply => {
                            return (
                                <>
                                    <div className="rely-header">
                                        <ReplyHeader userData={reply.user} />
                                    </div>
                                    <div className="rely-body">{reply.body}</div>
                                    <div className="reply-footer">
                                        <ReplyFooter like={reply.like} retweet ={reply.retweet} />
                                    </div>

                                </>
                            )
                        })}
                    </div>

                </>
            )
            }

        </div>
    )

}