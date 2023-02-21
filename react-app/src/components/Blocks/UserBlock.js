import './UserBlock.css'

export const UserBlock = ({ userData }) => {
    const { name, avatar, username, verified } = userData
    console.log(verified)

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
        </div>
    )


}