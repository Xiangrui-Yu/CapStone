import './UserBlock.css'
import { DeleteEditButton } from './DeleteEditButton'

export const UserBlock = ({ userData,tweetId }) => {
    const { name, avatar, username, verified } = userData ||{}

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
            <div className='delete-button'>
                <DeleteEditButton tweetId={tweetId} />
            </div>
        </div>
    )


}