
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retweetObj } from '../../store/retweet'
import { useHistory } from 'react-router-dom';
import { postNewT } from '../../store/tweets';


export const HandleRetweet = ({ object_type, object_id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
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
            body,
            originalContent

        }

        const createRetweet = await dispatch(retweetObj(object_type, object_id, payload))
        await dispatch(postNewT({body:originalContent}))
        setBody('')
        history.push('/')

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <button type="submit"><i className="fa-solid fa-retweet"></i></button>
            </form>
        </div>
    )


}


