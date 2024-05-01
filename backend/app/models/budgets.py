# Flask modules
from flask_sqlalchemy import SQLAlchemy

#Database module
from app.extensions import db

class Budgets(db.Model):
    __tablename__ = 'Budgets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    amount = db.Column(db.Integer)    
    icon = db.Column(db.String)
    expenses = db.relationship('Expenses', backref='budget', lazy=True)

    def __repr__(self):
        return f"<Budget id {self.id}, name: {self.name}, amount: {self.amount}>\n"

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()
