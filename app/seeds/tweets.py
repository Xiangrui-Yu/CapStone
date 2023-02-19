from app.models import db, Tweet, environment, SCHEMA


def seed_tweets():
    tweet_1 = Tweet(
        body="Excited to announce that my new book is now available for pre-order! 📚 #newbook #author #preorder",
        user_id =1
       )
    tweet_2 = Tweet(
        body="Just finished a grueling workout at the gym 💪 Feeling strong and energized! #fitness #workout #motivation",
        user_id =2   
        )
    tweet_3 = Tweet(
        body="Had a great time exploring the city today with friends. So much to see and do! 🌇 #citylife #friends #explore",
        user_id =3
        )
    tweet_4 = Tweet(
        body="Feeling grateful for my supportive family and friends who are always there for me. ❤️ #gratitude #thankful #blessed",
        user_id=4

    )
    tweet_5 = Tweet(
        body="Can't believe it's already Friday! Time flies when you're having fun. 😎 #TGIF #weekendvibes #fun",
        user_id=5

    )

    db.session.add(tweet_1)
    db.session.add(tweet_2)
    db.session.add(tweet_3)
    db.session.add(tweet_4)
    db.session.add(tweet_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tweets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tweets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tweets")
        
    db.session.commit()