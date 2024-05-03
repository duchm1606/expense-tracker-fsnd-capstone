# Api Handling
from flask import Blueprint, jsonify, abort, request 
import json
from app.models.budgets import Budgets
from app.models.expenses import Expenses
from app.util import errors_bp 

expenses_bp = Blueprint("expense", __name__, url_prefix="/expenses")
expenses_bp.register_blueprint(errors_bp)

# Get expense information
def getExpenseInformation(expenses):
    expensesList = []
    for expense in expenses:
        expensesList.append({
            "id": expense.id,
            "name": expense.name,
            "amount": expense.amount,
            "createAt": expense.createdDate
        })
    return expensesList

# Get all expenses
@expenses_bp.route("/", methods=['GET'])
def getExpenses():
    expenses = Expenses.query.all()
    expensesList = getExpenseInformation(expenses)
    return jsonify({
        "expenses": expensesList
    }), 200

# Get expense by budget id
@expenses_bp.route("/<int:budgetId>", methods=['GET'])
def getExpensesByBudgetId(budgetId):
    # Find for available budget
    budget = Budgets.query.filter_by(id = budgetId).first()
    if not budget:
        abort(404)
    expenses = Expenses.query.filter_by(budgetId = budgetId).all()
    expenseSpend = 0
    expensesList = []
    for expense in expenses:
        expenseSpend = expenseSpend + expense.amount
        expensesList.append({
            "id": expense.id,
            "name": expense.name,
            "amount": expense.amount,
            "createAt": expense.createdDate
        })
    return jsonify({
        "id": budget.id,
        "name": budget.name,
        "icon": budget.icon,
        "amount": budget.amount,
        "totalSpend": expenseSpend,
        "totalItem": len(expenses),
        "expenses": expensesList
    }), 200


# Make a new expense
@expenses_bp.route("/<int:budgetId>", methods=['POST'])
def createExpense(budgetId):
    # Find for available budget
    budget = Budgets.query.filter_by(id = budgetId).first()
    if not budget:
        abort(404)
    body = request.get_json()
    name = body.get('name', None)
    amount = body.get('amount', None)
    if (not name or not amount):
        abort(402)
    newExpense = Expenses(name = name, amount = amount, budgetId = budgetId)
    # Add to database
    newExpense.insert()
    return jsonify({
        'success': True,
    }), 200

# Erase a expense
# Required fields: id
@expenses_bp.route("/", methods=['DELETE'])
def deleteExpense():
    body = request.get_json()
    expenseId = body.get('id')
    expense = Expenses.query.get(expenseId)
    if not expense:
        abort(404)
    expense.delete()
    return jsonify({
        'success': True,
    }), 200 