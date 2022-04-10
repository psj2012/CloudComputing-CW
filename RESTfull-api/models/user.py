from db import db
from hashlib import sha256

# define the user info database
class UserModel(db.Model):
    __tablename__='users'
    
    id = db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80))
    password=db.Column(db.String(80))
    
    def __init__(self,username,password):
        self.username=username
        self.password=password
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        
    @classmethod
    def find_by_username(cls,_username):
        return cls.query.filter_by(username=_username).first()
    
    @staticmethod
    def generate_hash(password):
        return sha256(password.encode("utf-8")).hexdigest()
    
    @staticmethod
    def verify_hash(password,hash):
        return password==hash
    
    