import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { editTweet } from '../../store/tweets'

export const EditT = ({tweetId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(tweetId)
    
    const currentUser = useSelector(state=>state.session.user)

    const tweets = useSelector(state => state.tweets)
    console.log(tweets, 'this is tweets on EditT')
    const body = tweets[tweetId].body

    const [newBody, setBody] = useState(body)
    const [errors, setErrors] = useState([])


    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            body:newBody
        }
        const editTweetById = await dispatch(editTweet(tweetId, payload))

        if (editTweet){
            history.push('/')
        }

    }

    return (
        <form className='EditBody'
        onSubmit={handleSubmit}
    >
        {/* {currentUser &&
        <img src={currentUser.avatar}></img>} */}

        <label>
            
            <input
                type='text'
                name='body'
                value={newBody}
                onChange={e => setBody(e.target.value)}
                required
            />
        </label>
        <button
            className='tweet-post'
            type='submit'
        >
            Edit
        </button>
    </form>
    )
}