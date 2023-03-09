import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UndoTheFollow } from '../../store/follows'

export const UndoFollow = ({ userId }) => {
    const dispatch = useDispatch()


    const handleUndoUser = async () => {
        const addUser = await dispatch(UndoTheFollow(userId))
    }

    return (
        <div className='add-follower'>
            <button
                className='add-follower-button'
                type='submit'
                onClick={() => handleUndoUser()}
            >
                <i className="fa-solid fa-user-slash"></i>        
              </button>
        </div>
    );
}