import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retweetObj } from '../../store/retweet'
import { useHistory } from 'react-router-dom';
import { postNewT } from '../../store/tweets';
import { useModal } from "../../context/Modal";

import "./retweet.css"


export const HandleRetweet = ({ object_type, object_id }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    // const history = useHistory()
    const [body, setBody] = useState('')

    const retweet = useSelector(state => state.retweets)

    const tweetObj = useSelector(state => state.tweets[object_id])

    const replyObj = useSelector(state => state.replies[object_id])

    let originalContent = null

    if (object_type === "tweets") {
        originalContent = tweetObj.body
    } else if (object_type === "replies") {
        originalContent = replyObj.body
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(originalContent, " this is original Content")
        const payload = {
            body: `${body}\n\n${originalContent}`

        }

        const createRetweet = await dispatch(retweetObj(object_type, object_id, payload))
        await dispatch(postNewT(payload))
        setBody('')
        closeModal()
        // history.push('/')

    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="retweet-form">
                <input
                    type="text"
                    placeholder="quote the tweet"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <div className='retweet-original part'>
                    {originalContent}
                </div>
                {/* <button type="submit"><i className="fa-solid fa-retweet"></i></button> */}
                <button
                className='post-retweet'
                type='submit'
            >
                Retweet
            </button>

            </form>
        </div>
    )


}