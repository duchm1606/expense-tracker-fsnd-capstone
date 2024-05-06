# Backend - Expense Tracker

## Setting up the Backend

### Install Dependencies

1. **Python 3.10** - Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

2. **Virtual Environment** - We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized. Instructions for setting up a virual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

3. **PIP Dependencies** - Once your virtual environment is setup and running, install the required dependencies by navigating to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

4. **PostgreSQL** - Used to setup database environment for Local Developmentg.
   See [PostgreSQL Home Page](https://www.postgresql.org/download/) to install

### Setup the database

Create a new PostgreSQL with a new database by

```
sudo -u postgres psql
postgres=# create database "expense-tracker";
postgres=# create user udacity with encrypted password '1234';
postgres=# grant all privileges on database "expense-tracker" to udacity;

```

### Run the server

To run in Local Development, run the command

```
export FLASK_DEBUG=True
python3 server.py
```

## API Reference

This APIs can be requested from `localhost:5000` in Local Mode or `HOST_URL:5000` in Production Mode, with `HOST_URL` is the url that you run the application remotely. Normally, it will be the same with `NEXT_PUBLIC_BACKEND_URL` in `/frontend/.env`

### Error handling

An error can be returned as JSON Objects with the format:

```
{
    "success": False,
    "error": 400,
    "message": "bad request"
}
```

The API can return some error types when request fail

- 400: Bad Request
- 404: Resource Not Found
- 403: Permission Denied
- 422: Unprocessable
- 500: Internal server error

### Endpoints

#### GET '/api/budgets/'

- Fetches a dictionary of budgets
- Request arguments: None
- Return: An object with information of budgets, the total number of budgets with total amount and spend

Example: `curl -X GET -H "Content-Type: application/json" http://127.0.0.1:5000/api/budgets/`

```
{
  "budgets": [
    {
      "amount": 2000,
      "icon": "\ud83d\ude02",
      "id": 44,
      "name": "Test",
      "totalItem": 0,
      "totalSpend": 0
    }
  ],
  "numOfBudget": 1,
  "totalBudget": 2000,
  "totalSpend": 0
}
```

#### POST '/api/budgets/'

Send a post request to create a new budget

Example: `curl http://127.0.0.1:5000/api/budgets/ -X POST -H {"Content-Type: application/json",  "Authorization": "Bearer" $TOKEN} -d '{"name": "Budget 1","icon": "\ud83d\ude02","amount": "1000"}'`

```
{
  "success": true
}
```

#### PATCH '/api/budgets/{id}'

- Send a PATCH request to edit the information of budget
- Arguments: {id}: the id of budgets needed to modify

Example: `curl http://127.0.0.1:5000/api/budgets/ -X PATCH -H {"Content-Type: application/json",  "Authorization": "Bearer" $TOKEN} -d '{"name": "Budget 1","icon": "\ud83d\ude02","amount": "1000"}'`

```
{
  "success": true
}

```

#### DELETE '/api/budgets/{id}'

- Send a DELETE request to delete the budget with all its expenses
- Arguments: {id}: the id of budgets to delete

Example: `curl http://127.0.0.1:5000/api/budgets/1 -X DELETE -H {"Content-Type: application/json",  "Authorization": "Bearer" $TOKEN}`

```
{
  "success": true
}

```

#### GET '/api/expenses/'

- Fetches a dictionary of expenses
- Request arguments: None
- Return: An object with information of expenses

Example: `curl -X GET -H "Content-Type: application/json" http://127.0.0.1:5000/api/budgets/`

```
{
  "expenses": [
    {
        "id": 1,
        "name": "home",
        "amount": 1000,
        "createdAt": "Sat, 04 May 2024 15:07:15 GMT"
    }
  ]
}
```

#### GET '/api/expenses/${id}/'

- Fetches a dictionary of expenses in a budget given by budget id
- Request arguments: {id} the id of budget
- Return: An object with information of expenses of the budget given by id

Example: `curl -X GET -H "Content-Type: application/json" http://127.0.0.1:5000/api/budgets/1`

```
{
    "amount": 2000,
    "icon": "\ud83d\ude02",
    "id": 44,
    "name": "Test",
    "totalItem": 1,
    "totalSpend": 1000
    "expenses": [{
        "id": 1,
        "name": "home",
        "amount": 1000,
        "createdAt": "Sat, 04 May 2024 15:07:15 GMT"
    }]
}
```

#### POST '/api/expenses/${id}/'

Send a post request to create a new expense in budget given by id

Example: `curl http://127.0.0.1:5000/api/expense/1 -X POST -H {"Content-Type: application/json",  "Authorization": "Bearer" $TOKEN} -d '{"name": "Expense 1","amount": "1000"}'`

```
{
  "success": true
}

```

#### DELETE '/api/expenses/${id}/'

Send a delete request to delete a expense in budget given by id

Example: `curl http://127.0.0.1:5000/api/expense/1 -X DELETE -H {"Content-Type: application/json",  "Authorization": "Bearer" $TOKEN} -d '{"id":1}'`

```
{
  "success": true
}

```

#### Authentication - Authorization

This app requires authentication via logging in. In order to use the api of the application, user must login by enter the roles email and password belows by selecting the login button

Roles:

    - Admin:
        email: admin@gmail.com
        password: admin@1234
        permissions:
            Add, Modify, Delete the Budgets
            Add, Delete the Expenses

    - Member:
        email: member@gmail.com
        passwrod: member@1234
        permissions:
            Add, Delete the Expensess

If not logging in, the user can only view for expenses and budgets

### Test the APIs by Postman.

In case of testing API's response by Postman, remember to add access token, which is fetched by request to `/api/users/` in the frontend after logging

The headers must includes

```
headers={"Content-Type": "application/json",
        "Authorization": "Bearer" ${accessToken}
        }
```

with accessToken is the access token you get from `/api/users/`

If you want to test for full permissions into the API, you can use the token

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllNT3JRUWJCdzR6YzRwQWtMVi1ZUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1ydGE3dncwcTQwbGVkeHJmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDkxNzEyMTc4NjE4NDA4Mjc0NiIsImF1ZCI6WyJleHBlbnNlLXRyYWNrZXItYXBpIiwiaHR0cHM6Ly9kZXYtcnRhN3Z3MHE0MGxlZHhyZi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzE0OTY3NTg2LCJleHAiOjE3MTUwNTM5ODYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhenAiOiJIWFpueHJqWllOb2NWNG9ta001OGpzdFJIN3NZN1ZTeSIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpidWRnZXRzIiwiZGVsZXRlOmV4cGVuc2VzIiwiZ2V0OmJ1ZGdldHMiLCJnZXQ6ZXhwZW5zZXMiLCJwYXRjaDpidWRnZXQiLCJwb3N0OmJ1ZGdldHMiLCJwb3N0OmV4cGVuc2VzIl19.G-VvtMfk8SqqjvpYZgoI7hhm-773yki6YTIaF-SByKUKxWxXM5RXHNx7puW8HHEObYjgreqnavNvjrnUkFgBx1tOyVsIDZoJHS6-pOe-JRtaSoYEZfv3ypCsdU08j1PjrA-OLoawyZnwUvhdKtn_W1viiMdXFbj1e-hMlUB27fmFXWHpQkJh_UyWsvSJlRQ5BGlWTdZkRY2GNzzbF3ggPJxLx5_YpKKTmao9MoKPfA0EQhJ269L5kAplB1aTlhOS2Yort1ryqrJDeQtUwHiWA-lhoPudkXQFdgk2SDM2-QjPYWkPW0btHA9bmDJktKxyXFLOA1FEF51HWldcghw1dA
```

## Run by gunicorn

In production, the backend's app will run on WSGI server. The app will take the environment variable via `.env` instead of `.env.dev` in Development Mode.
To test the work of app before deployment, set the `FLASK_DEBUG` into `False`
