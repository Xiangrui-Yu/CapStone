import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postNewT } from '../../store/tweets'
import "./tweets.css"
import DefaultAvatar from '../../DefaultAvatar.png'

export const AddT = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    const [body, setBody] = useState('')
    const [erros, setErrors] = useState([])

    const currentUser = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body
        }

        const createNewTweet = await dispatch(postNewT(payload))

        if (createNewTweet) {
            setBody('')
            history.push('/')
        }
    }

    return (
        <form className='tweetBody'
            onSubmit={handleSubmit}
        >
            {currentUser && currentUser.avatar ? (
                <img src={currentUser.avatar} alt="User avatar" />
            ) : (
                <img src={DefaultAvatar} alt="Default avatar" />
            )}

            <label>

                <input
                    type='text'
                    name='body'
                    placeholder='what is happening'
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    required
                />
            </label>
            <button
                className='tweet-post'
                type='submit'
            >
                Tweet
            </button>


        </form>

    )

}