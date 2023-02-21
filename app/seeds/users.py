from app.models import db, User, environment, SCHEMA


def seed_users():
    demo = User(
        name ='Demo',
        username='Demo', 
        email='demo@aa.io', 
        password='password',
        avatar='https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3272&q=80',
        verified = True)
    marnie = User(
        name='marnie',
        username='marnie',
        email='marnie@aa.io', 
        password='password',
        avatar="https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1673&q=80",
        verified = False
        )
    bobbie = User(
        name='bobbie',
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        avatar='https://images.unsplash.com/photo-1516934024742-b461fba47600?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        verified= True
        )
    sarah = User(
        name='sarah',
        username='sarah',
        email='sarah@aa.io',
        password='password',
        avatar='https://images.unsplash.com/photo-1470093851219-69951fcbb533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        verified= False
    )
    jesse = User(
        name='jesse',
        username='jesse',
        email='jesse@aa.io',
        password='password',
        avatar='https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        verified= False
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sarah)
    db.session.add(jesse)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()