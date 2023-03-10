import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteTheReply } from '../../store/replies'


export const ReplyDelete = ({ ReplyId }) => {
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();


    return (
        <button
            onClick={() => {
                dispatch(deleteTheReply(ReplyId)).catch(async (res) => {
                    setErrors([]);
                    const error = await res.json();
                    if (error) setErrors([error])
                })
            }}
        >
            Delete
        </button>
    )

}