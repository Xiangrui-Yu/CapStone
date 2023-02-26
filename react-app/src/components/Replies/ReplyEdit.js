import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { editTheReply } from '../../store/replies';

export const ReplyEdit = ({replyId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(replyId, "this is replyId")

    const currentUser = useSelector(state =>state.session.user)
    const reply = useSelector(state => state.replies)
    console.log(reply, 'this is reply')

    const body = reply[replyId].body

    const [newBody, setBody] = useState(body);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    

    const handleSubmit = async e => {
        e.preventDefault();
        const paylaod ={
            body:newBody
        };

        const editReplyId = await dispatch(editTheReply(replyId,paylaod));

        if(editReplyId) {
            closeModal();
        }
    }

    return (
        <>

            <div className='modal'>
                <div className='modal-content'>
                    <form className='EditBody' onSubmit={handleSubmit}>
                        {currentUser && <img src={currentUser.avatar}></img>}
                        <label>
                            <input
                                type='text'
                                name='body'
                                value={newBody}
                                onChange={e => setBody(e.target.value)}
                                required
                            />
                        </label>
                        <button className='tweet-post' type='submit'>
                            Edit
                        </button>
                    </form>
                </div>
            </div>

        </>
    );




}