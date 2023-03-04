import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import './UserBlock.css'
import { DeleteEditButton } from './DeleteEditButton'



export const UserBlock = ({ userData, id }) => {
    const { name, avatar, username, verified } = userData || {}
    const currentUser = useSelector(state => state.session.user);

    return (
        <div className='user_holder'>
            <Link to={`/users/${userData.id}`} className='link-userBlock'>

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
            </Link>

            {currentUser && userData.id === currentUser.id && (
                <div className='delete-edit-button'>
                    <DeleteEditButton id={id} />
                </div>
            )}
        </div>
    )

}