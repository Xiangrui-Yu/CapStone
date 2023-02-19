from app.models import db, Like, environment, SCHEMA


def seed_likes():
    like_1 = Like(
        like_count =1,
        user_id =1,
        reply_id =1
       )
    like_2 = Like(
        like_count =1,
        user_id =2,
        tweet_id=2
        )
    like_3 = Like(
        like_count =1,
        user_id=3,
        reply_id=3
        )
    like_4 = Like(
        like_count =1,
        user_id=4,
        reply_id=4

    )
    like_5 = Like(
        like_count =1,
        user_id=5,
        retweet_id=5

    )

    db.session.add(like_1)
    db.session.add(like_2)
    db.session.add(like_3)
    db.session.add(like_4)
    db.session.add(like_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")
        
    db.session.commit()