export const ReplyFooter = ({ like, retweet, tweetId }) => {
    return (
        <span className='footer_holder'>
            {/* <div className='rely_part'>
                <ReplyButton tweetId={tweetId} />
            </div> */}
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