from app.models import db, Retweet, environment, SCHEMA


def seed_retweets():
    retweet_1 = Retweet(
        user_id =5,
        reply_id=3,
        retweet_count=1
       )
    retweet_2 = Retweet(
        user_id =3,
        tweet_id=2,
        retweet_count=1
        )
    retweet_3 = Retweet(
        user_id =4,
        reply_id =1,
        retweet_count=1
        )
    retweet_4 = Retweet(
        user_id =2,
        tweet_id =5,
        retweet_count=1
    )
    retweet_5 = Retweet(
        user_id =1,
        tweet_id=4,
        retweet_count=1
    )

    db.session.add(retweet_1)
    db.session.add(retweet_2)
    db.session.add(retweet_3)
    db.session.add(retweet_4)
    db.session.add(retweet_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_retweets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.retweets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM retweets")
        
    db.session.commit()