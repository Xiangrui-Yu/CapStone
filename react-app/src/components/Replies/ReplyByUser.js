import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserReplies } from '../../store/replies'
import { ReplyHeader } from './ReplyHeader'
import { ReplyFooter } from './ReplyFooter'

export const ReplyByUser = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const repliesObj = useSelector(state => state?.replies)
    const replies = Object.values(repliesObj).sort((a,b) => b.id -a.id)

    useEffect(() =>{
        dispatch(getUserReplies(userId))
    },[dispatch, userId])


    return (
        <>  
            <div>
                {replies && replies?.map(reply =>{
                    return (
                        <>
                        <div className="rely-header">
                            <ReplyHeader userData={reply.user} id={reply.id} />
                        </div>
                        <div className="rely-body">{reply.body}</div>
                        <div className="reply-footer">
                            <ReplyFooter like={reply.like} retweet={reply.retweet} />
                        </div>

                    </>
                    )
                })}
            </div>

        
        </>
    )
}