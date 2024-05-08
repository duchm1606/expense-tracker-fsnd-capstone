# The Expense Tracker Introduction - Udacity Fullstack Nanodegree Capstone Project

This is an expense tracker app which is a highly useful tool designed to help teams and businesses manage their finances with greater easse
and accuracy. By offering real-time budget monitoring, this app allows users to record every expenditures as soon as it happen,
ensuring that they always know where their money is going, features like categorized spending, statisticize all the budget, modify the budgets and epenses make it simpler to identify unnecessary expenses and optimize saving strategies

At the end, users of the app should be able to

- Display Budgets and Expenses
- Smart and Effective management by roles
  - For admin: Can manage budgets and expenses by create, modify and delete them
  - For members: Can manage expenses in budgets

Live server: [Demo](http://44.202.68.107)

# Quick start

## Pre-requisites and Local Development

Developers using this project should have python3.10, pip and node v20 installed on the local machine

### Backend

From the backend folder run `pip install requirements.txt`. All required packages are included in the requirements file

To run the application run the following command

```
export FLASK_DEBUG=True
python3 server.py
```

These commands put the application in development and directs our application to use the `__init__.py` file in our flaskr folder. Working in development mode shows an interactive debugger in the console and restarts the server whenever changes are made

The backend server is run on `http://127.0.0.1:5000` or `localhost:5000` by default and it is a proxy in the frontend configuration

Before run this, you must setup the database. In detail see HERE

### Run the frontend

From the frontend folder, run the following commands to start the client

```
npm install // only once to install dependencies
npm run dev
```
The frontend will run on  `http://127.0.0.1:3000` or `localhost:3000`

## Run the project by Docker

This project support run directly by docker. To executive, run the command

```
docker-compose up --build
```

or

```
docker compose up --build
```

Make sure you have installed docker on your machine

## Test

This project supports production test only.

In order to run test, navigate to the backend folder, change the `database_test.db` to `database.db` in `/instance` to populate the testing data

Then, run the following command

```
export FLASK_DEBUG=False
python3 -m pytest
```

In many test has failed in status 403, maybe the token has been expired. After login in frontend, send a get request to `/api/users` to get the token access key, then paste into `adminToken` and `memberToken`, then run again

## API Reference & Authentication - Authorization

See [DETAIL](https://github.com/itsnot-aduck/expense-tracker-fsnd-capstone/blob/main/backend/README.md#api-reference)

## Authors

- [Duc HoangMinh](https://github.com/itsnot-aduck)
