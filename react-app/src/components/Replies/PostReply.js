import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addReply } from '../../store/replies'

export const PostRelyNoButton = ({ tweetId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(tweetId, " this is the tweetId on the post reply")
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])


    const currentUser = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        console.log('handleSubmit called');
        e.preventDefault();

        const payload = {
            body
        }
        console.log(body, " what is inside the payload")
        const addAReply = await dispatch(addReply(tweetId, payload))

        if (addAReply) {
            setBody('')
            history.push('/')
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
