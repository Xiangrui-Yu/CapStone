from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String)
    verified = db.Column(db.Boolean, default=False)

    tweets = db.relationship('Tweet', back_populates='users',cascade='all,delete-orphan')
    replies = db.relationship("Reply", back_populates='users', cascade='all,delete-orphan')
    retweets = db.relationship('Retweet', back_populates='users', cascade='all,delete-orphan')
    likes = db.relationship('Like', back_populates='users', cascade='all,delete-orphan')

    followers = db.relationship('Follow', foreign_keys='Follow.following_id', back_populates='following')   

    following = db.relationship('Follow', foreign_keys='Follow.follower_id', back_populates='follower')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name':self.name,
            'username': self.username,
            'email': self.email,
            'avatar':self.avatar,
            'verified':self.verified,
            "followers": [follower.to_dict() for follower in self.followers],
            "following": [following.to_dict() for following in self.following]
        }
