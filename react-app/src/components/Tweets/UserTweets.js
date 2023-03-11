import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'

import { loadAllTweets } from '../../store/tweets'
import { UserBlock } from '../Blocks/UserBlock'
import { FooterBlock } from '../Blocks/FooterBlock'
import { getUserTweets } from '../../store/tweets'

export const UserTweets = ({ userId }) => {
    const dispatch = useDispatch()
    // const [showInfo, setShowInfo] = useState(false)

    const currentUserId = useSelector(state => state.session.user.id)
    const tweetsObj = useSelector(state => state?.tweets)
    const tweets = Object.values(tweetsObj).sort((a, b) => b.id - a.id);
    const history = useHistory()

    


    useEffect(() => {
        dispatch(getUserTweets(userId))
    }, [dispatch, userId])

    const handleRepliesClick = () => {
        history.push(`/users/${userId}/replies`);
    };

    const handleTweetsClick = () => {
        history.push(`/users/${userId}`)
    }

    const handleFollowClick = () => {
        history.push(`/follows/following`)
    }



    return (
        <>
            <div className='replyByUser-holder'>
                <div className='two-buttons'>
                    <button className='show-replies-user'
                        onClick={() => handleTweetsClick()}
                    >
                        Tweets
                    </button>


                    <button className='show-replies-user'
                        onClick={() => handleRepliesClick()}
                    >
                        Replies
                    </button>
                    {userId == currentUserId && (
                    <button
                        className='show-follow-user'
                        onClick={() => handleFollowClick()}
                    >
                        Following
                    </button>
                )}
                </div>


                <div className='user-tweets-holder'>
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

                </div>

            </div>

        </>)

}