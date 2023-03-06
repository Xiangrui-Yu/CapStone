from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tweets import seed_tweets,undo_tweets
from .replies import seed_replies,undo_replies
from .retweets import seed_retweets,undo_retweets
from .likes import seed_likes, undo_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # db.session.execute(f"TRUNCATE table {SCHEMA}.tweets RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.retweets RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_users()
        db.session.commit()
    seed_users()
    # Add other seed functions here
    seed_tweets()
    seed_replies()
    seed_retweets()
    seed_likes()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_likes()
    undo_retweets()
    undo_replies()
    undo_tweets()
    undo_users()
    # Add other undo functions here