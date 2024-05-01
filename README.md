sudo -u postgres psql
postgres=# create database "expense-tracker";
postgres=# create user udacity with password '1234';
postgres=# grant all privileges on database "expense-tracker" to udacity;

/\*\*

- Get all budgets
- GET /dashboard/budgets
  \*/

/\*\*

- Get all Expenses
- GET /dashboard/expenses
  \*/

/\*\*

- Get expense of budget
- GET /dashboard/expense/<int:id>
  \*/

Edit a budget
PATCH /dashboard/expense/<int:id>

    Delete a budget
    PATCH /dashboard/budgets
    {id}

    Delete a expense
    DELETE /dashboard/expense
    {id}

    Create a budget
    POST /dashboard/budgets

    Delete a expense
    POST /dashboard/expenses
