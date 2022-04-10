from hashlib import sha256
from db import db

# define the user-recipe relationship database
class User_like_Model(db.Model):
    __tablename__='like'
    
    id = db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80))
    recipeid=db.Column(db.String(80))
    # String or integer undecided
    
    def __init__(self,_username,_recipeid) :
        self.username=_username
        self.recipeid=_recipeid
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
        
    @classmethod
    def find_by_username(cls,_username):
        return cls.query.filter_by(username=_username).all()
    
    def find_by_recipeid(cls,_recipeid):
        return cls.query.filter_by(recipeid=_recipeid).all()
    
    def find_by_username_and_recipeid(cls,_username,_recipeid):
        return cls.query.filter_by(username=_username,recipeid=_recipeid).first()
    
    def recipe_like_count(cls,_recipename):
        return len(cls.query.filter_by(recipename=_recipename).all())
    
    def user_like_count(cls,_username):
        return len(cls.query.filter_by(username=_username).all())
    
    
    