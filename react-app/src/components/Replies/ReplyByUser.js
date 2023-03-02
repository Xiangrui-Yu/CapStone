import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getUserReplies } from '../../store/replies'
import { ReplyHeader } from './ReplyHeader'
import { ReplyFooter } from './ReplyFooter'
import TwitterPic from '../../Twitter.png'
import "../UserPage.css"

export const ReplyByUser = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const repliesObj = useSelector(state => state?.replies)
    // const [showInfo, setShowInfo] = useState(false)
    const history = useHistory()

    const replies = Object.values(repliesObj).sort((a, b) => b.id - a.id)

    useEffect(() => {
        dispatch(getUserReplies(userId))
    }, [dispatch, userId])

    const handleRepliesClick = () => {
        history.push(`/users/${userId}/replies`);
    };

    const handleTweetsClick = () => {
        history.push(`/users/${userId}`)
    }
    return (
        <div className='replyByUser-holder'>
            <img className="userpage-img" src={TwitterPic} alt="Twitter Logo"></img>

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

            </div>

            <div className='replyByUser-info'>
                {replies && replies?.map(reply => {
                    return (
                        <>
                            <div className="rely-header">
                                <ReplyHeader userData={reply.users} id={reply.id} />
                            </div>
                            <div className="rely-body">{reply.body}</div>
                            <div className="reply-footer">
                                <ReplyFooter like={reply.likes} retweet={reply.retweets} id={reply.id} />
                            </div>

                        </>
                    )
                })}
            </div>


        </div>
    )
}