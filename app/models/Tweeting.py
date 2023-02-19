from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Tweet (db.Model):
    __tablename__ = 'tweets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    body = db.Column(db.String(255), nullable = False)

    users = db.relationship('User',back_populates='tweets')
    replies = db.relationship('Reply',back_populates='tweets',cascade='all,delete-orphan')
    likes = db.relationship('Like', back_populates ='tweets',cascade='all,delete-orphan')
    retweets = db.relationship('Retweet', back_populates='tweets',cascade='all,delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "body":self.body,
            "replies":[reply.to_dict() for reply in self.replies],
            "retweets":self.retweets.retweet_count,
            "likes":self.likes.like_count,
            "user": self.user.to_dict()
        }

class Reply(db.Model):
    __tablename__ = 'replies'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True)
    body = db.Column(db.String(255), nullable = False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    tweet_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tweets.id')))

    users = db.relationship("User",back_populates="replies")
    tweets = db.relationship('Tweet',back_populates='replies')
    likes = db.relationship('Like',back_populates='replies',cascade='all,delete-orphan')
    retweets = db.relationship('Retweet',back_populates='replies',cascade='all,delete-orphan')

    def to_dict(self):
        return{
            "id":self.id,
            "body":self.body,
            "tweet":self.tweets.to_dict(),
            "likes": self.likes.like_count,
            "retweets": self.retweets.retweet_count,
        }

class Like(db.Model):
    __tablename__ = 'likes'
    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    like_count =db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    reply_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('replies.id')))

    tweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tweets.id')))

    retweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('retweets.id')))

    users = db.relationship('User',back_populates='likes')

    tweets = db.relationship('Tweet',back_populates='likes')

    replies = db.relationship('Reply',back_populates='likes')

    retweets = db.relationship('Retweet',back_populates='likes')

    def to_dict(self):
        return {
            "like_count": self.like_count
        }

class Retweet(db.Model):
    __tablename__ = 'retweets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key =True)
    body = db.Column(db.String(255))
    isOriginal = db.Column(db.Boolean, default=True)
    retweet_count = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    reply_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('replies.id')))

    tweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tweets.id')))


    users = db.relationship('User',back_populates='retweets')

    tweets = db.relationship('Tweet',back_populates='retweets')

    replies = db.relationship('Reply',back_populates='retweets')

    likes = db.relationship('Like',back_populates='retweets',cascade='all,delete-orphan')

    def to_dict(self):
        return {
            "retweet_count": self.retweet_count
        }

    






