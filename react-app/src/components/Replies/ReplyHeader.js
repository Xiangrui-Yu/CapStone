import { useSelector } from 'react-redux';

import { ReplyEditDelete } from "./ReplyEditDelete"


export const ReplyHeader = ({ userData, id }) => {
    const { name, avatar, username, verified } = userData || {}
    const currentUser = useSelector(state => state.session.user);


    return (
        <div className='user_holder'>
            <div className="user_avatar">
                <img src={avatar} alt="User avatar"></img>
            </div>
            <div className="user_info">
                {name}{" "}
                <span className="user_info2">
                    {verified && <i className="fa-duotone fa-badge-check"></i>}
                    @{username}
                </span>
            </div>
            {currentUser && userData.id === currentUser.id && (
                <div className='delete-edit-button'>
                    <ReplyEditDelete id={id} />
                </div>

            )}
        </div>
    )

}