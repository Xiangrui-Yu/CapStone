import { PostRely } from '../Replies/PostReplyNoButton'
import { ReplyButton } from '../Replies/ReplyButton'

import './FooterBlock.css'

export const FooterBlock = ({ like, retweet, tweetId }) => {
    return (
        <span className='footer_holder'>
            <div className='rely_part'>
                <ReplyButton tweetId={tweetId} />
                {/* <PostRely tweetId={tweetId} /> */}
            </div>
            <div className='retweet_part'>
                {retweet && retweet[0] ? (
                    <>
                        <i className="fa-solid fa-retweet"></i>
                        {retweet[0]}

                    </>
                ) : (
                    <i className="fa-solid fa-retweet"></i>
                )}
            </div>

            <div className='like_part'>
                {like && like[0] ? (
                    <>
                        <i className="fa-regular fa-heart"></i>
                        {like[0]}
                    </>
                ) : (
                    <i className="fa-regular fa-heart"></i>
                )}
            </div>

        </span>
    )
}