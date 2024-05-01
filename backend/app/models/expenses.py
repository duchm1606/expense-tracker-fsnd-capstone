# Flask modules
from flask_sqlalchemy import SQLAlchemy

#Database module
from app.extensions import db
from datetime import datetime

class Expenses(db.Model):
    __tablename__ = 'Expenses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    amount = db.Column(db.Integer) 
    budgetId = db.Column(db.Integer, db.ForeignKey('Budgets.id'), nullable=False)
    createdDate = db.Column(db.DateTime, default=datetime.now)
    def __repr__(self):
        return f"<Expense name: {self.name}, amount: {self.amount}>\n"
    
    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()
