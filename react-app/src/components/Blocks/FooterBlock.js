import './FooterBlock.css'

export const FooterBlock = ({ like, retweet }) => {
    return (
        <span className='footer_holder'>
            {/* <div className='rely_part'>
                <reply />
            </div> */}
            <div className='retweet_part'>
                {retweet[0] ? (
                    <>
                        <i className="fa-solid fa-retweet"></i>
                        {retweet[0]}

                    </>
                ) : (
                    <i className="fa-solid fa-retweet"></i>
                )}
            </div>

            <div className='like_part'>
                {like[0] ? (
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