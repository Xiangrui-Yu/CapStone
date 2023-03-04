import { PostRely } from '../Replies/PostReplyNoButton'
import { ReplyButton } from '../Replies/ReplyButton'
import { HandleLikes } from '../Likes/HandleLikes'
import { useSelector, useDispatch } from 'react-redux';
import {HandleRetweet} from "../Retweet/HandleRetweet"
import './FooterBlock.css'

export const FooterBlock = ({ like, retweet, tweetId }) => {
    
    return (
        <span className='footer_holder'>
            <div className='rely_part'>
                <ReplyButton tweetId={tweetId} />
            </div>
            <div className='retweet_part'>
                {retweet && retweet[0] ? (
                    <>
                        <HandleRetweet object_type={"tweets"} object_id={tweetId} />
                        {/* <i className="fa-solid fa-retweet"></i> */}
                        {retweet.length}

                    </>
                ) : (
                    <HandleRetweet object_type={"tweets"} object_id={tweetId} />

                    // <i className="fa-solid fa-retweet"></i>
                )}
            </div>

            <div className='like_part'>
                {like && like[0] ? (
                    <>
                        {/* <i className="fa-regular fa-heart"></i> */}
                        <HandleLikes object_type={'tweets'} object_id={tweetId} />
                        {like.length}
                    </>
                ) : (
                    // <i className="fa-regular fa-heart"></i>
                    <HandleLikes object_type={'tweets'} object_id={tweetId} />

                )}
            </div>

        </span>
    )
}