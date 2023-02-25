import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addReply } from '../../store/replies'
import './PostReply.css'

export const PostRely = ({tweetId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])
    console.log(tweetId,'this is tweetId')


    const currentUser = useSelector(state => state.session.user)


    const handleSubmit = async (e) => {
        console.log('handleSubmit called');
        e.preventDefault();

        const payload = {
            body
        }
        const addAReply = await dispatch(addReply(tweetId, payload))

        if (addAReply) {
            setBody('')
            history.push(`/tweets/${tweetId}`)
        }
    }
    return (
        <form className='replyBody'
            onSubmit={handleSubmit}
        >
            {currentUser &&
                <img src={currentUser.avatar}></img>}

            <label>

                <input
                    type='text'
                    name='body'
                    placeholder='tweet your reply'
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    required
                />
            </label>

            <button
                className='reply-post'
                type='submit'
            >
                Reply
            </button>


        </form>

    )

}
