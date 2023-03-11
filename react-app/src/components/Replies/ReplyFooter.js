import { HandleLikes } from "../Likes/HandleLikes"
import './PostReply.css'
export const ReplyFooter = ({ like, retweet,id }) => {
    return (
        <span className='footer_holder'>
            {/* <div className='rely_part'>
                <ReplyButton tweetId={tweetId} />
            </div> */}
            {/* <div className='retweet_part'>
                {retweet && retweet[0] ? (
                    <>
                        <i className="fa-solid fa-retweet"></i>
                        {retweet.length}

                    </>
                ) : (
                    <i className="fa-solid fa-retweet"></i>
                )}
            </div> */}

            <div className='reply-like_part'>
                {like && like[0] ? (
                    <>  
                        <HandleLikes object_type={'replies'} object_id={id} />
                        {/* <i className="fa-regular fa-heart"></i> */}
                        {like.length}
                    </>
                ) : (
                    // <i className="fa-regular fa-heart"></i>
                    <HandleLikes object_type={'replies'} object_id={id} />

                )}
            </div>

        </span>
    )
}