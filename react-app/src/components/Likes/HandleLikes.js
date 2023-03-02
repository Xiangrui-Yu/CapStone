import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { handleLikes } from "../../store/likes";

export const HandleLikes = ({ object_type, object_id }) => {
    const dispatch = useDispatch();




    return (
        <>
            <button
                className='like-button'
                style={{border:"none"}}
                onClick={() => {
                    console.log('like button clicked')
                    dispatch(handleLikes(object_type, object_id))
                }}>
                <i className="fa-regular fa-heart"></i>

            </button>

        </>

    )

}