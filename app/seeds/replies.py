from app.models import db, Reply, environment, SCHEMA


def seed_replies():
    reply_1 = Reply(
        body="Congratulations on the new book! Can't wait to read it! 🎉📖",
        user_id =5,
        tweet_id =1
       )
    reply_2 = Reply(
        body="Awesome job on the workout! 💪💯 Keep up the great work! #fitnessmotivation #workoutdone",
        user_id =4,
        tweet_id =2  
        )
    reply_3 = Reply(
        body="Sounds like you had a wonderful day! What was your favorite part of the city? 🌃👀",
        user_id =2,
        tweet_id =3
        )
    reply_4 = Reply(
        body="Gratitude is such an important attitude to have. Happy to hear you have a great support system! 💕 #family #friends #blessed",
        user_id=3,
        tweet_id=4

    )
    reply_5 = Reply(
        body="Yes, the week flew by! Hope you have a great weekend planned! 🎉😎 #weekendfun #TGIF #happyfriday",
        user_id=1,
        tweet_id=5

    )

    db.session.add(reply_1)
    db.session.add(reply_2)
    db.session.add(reply_3)
    db.session.add(reply_4)
    db.session.add(reply_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM replies")
        
    db.session.commit()