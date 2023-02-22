import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteTweet } from '../../store/tweets'

export const DeleteT = ({tweetId}) =>{
    // const {tweetId} = useParams();
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    return(
        <button
            onClick={() =>{
                dispatch(deleteTweet(tweetId)).catch(async (res) => {
                    setErrors([]);
                    const error = await res.json();
                    if (error) setErrors([error])
                })
            }}
        
        >
        delete
        </button>
    )
}
