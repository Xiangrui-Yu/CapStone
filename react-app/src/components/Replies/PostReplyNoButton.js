import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addReply } from '../../store/replies'
import './PostReply.css'
import DefaultAvatar from '../../DefaultAvatar.png'

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
            history.push(`/tweets/${tweetId}`)
        }
    }
    return (
        <form className='replyBody-No-Button'
            onSubmit={handleSubmit}
        >
            <div className='replyBody-No-Button-content'>
                {currentUser && currentUser.avatar ? (
                    <img src={currentUser.avatar}></img>
                ) : (
                    <img src={DefaultAvatar} alt="Default avatar" />
                )}
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


            </div>

        </form>

    )

}
