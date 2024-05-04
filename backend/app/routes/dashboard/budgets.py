# Api Handling
from flask import Blueprint, jsonify, abort, request
from sqlalchemy import asc
import json
from app.models.budgets import Budgets
from app.models.expenses import Expenses
from app.util import errors_bp 
from app.extensions.auth import requires_auth

budgets_bp = Blueprint("core", __name__, url_prefix="/budgets")
budgets_bp.register_blueprint(errors_bp)

def getExpensesByBudgetsId(budgetId):
    expenses = Expenses.query.filter_by(budgetId = budgetId).all()
    return expenses

@budgets_bp.route("/", methods=['GET'])
def get_budgets():
    try:
        # Get all budgets
        budgets = Budgets.query.order_by(asc(Budgets.id)).all()
        totalBudget = 0
        totalSpend = 0
        # Save information for each budget
        budgetLists = []
        # Get information for budgets
        for budget in budgets:
            totalBudget = totalBudget + budget.amount
            expensesTotalSpend = 0
            expenses = getExpensesByBudgetsId(budget.id)
            for expense in expenses: 
                expensesTotalSpend = expensesTotalSpend + expense.amount
            totalSpend = totalSpend + expensesTotalSpend
            budgetLists.append({
                'id': budget.id,
                'name': budget.name,
                'icon': budget.icon,
                'amount': budget.amount,
                'totalSpend':expensesTotalSpend,
                'totalItem': len(expenses)
            })
        return jsonify({
            'numOfBudget': len(budgets),
            'totalBudget': totalBudget,
            'totalSpend': totalSpend,
            'budgets': budgetLists
        }), 200
    except:
        abort(500)

@budgets_bp.route("/", methods=['POST'])
@requires_auth('post:budgets')
def create_budgets(token):
    body = request.get_json()
    name = body.get('name', 'Untitled')
    amount = body.get('amount', 0)
    icon = body.get('icon', '🚗')
    #TODO: Add find clone 
    # Make new budget
    new_budget = Budgets(name = name, amount = amount, icon = icon)
    # Add to database
    new_budget.insert()
    return jsonify({
        'success': True
    }), 200

@budgets_bp.route("/<int:BudgetId>", methods=['PATCH'])
@requires_auth('patch:budget')
def modify_budget(token, BudgetId):
    findBudget = Budgets.query.filter_by(id = BudgetId).first()
    # Check for available id
    if not findBudget:
        abort(404)
    body = request.get_json()
    findBudget.name = body.get('name', 'Untitled')
    findBudget.amount = body.get('amount', '0')
    findBudget.icon = body.get('icon', '🚗')
    findBudget.update()
    return jsonify({
        'success': True
    }), 200
    
@budgets_bp.route("/<int:BudgetId>", methods=['DELETE'])
@requires_auth('delete:budgets')
def delete_budget(token, BudgetId):
    findBudget = Budgets.query.filter_by(id = BudgetId).first()
    # Check for available id
    if not findBudget:
        abort(400)
    # Delete all expense before delete budget
    expenses = getExpensesByBudgetsId(BudgetId)
    for expense in expenses:
        expense.delete()
    # Delte budget
    findBudget.delete()
    return jsonify({
        'success': True
    }), 200
