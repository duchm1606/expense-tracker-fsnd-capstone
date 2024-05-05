"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { React, useState, useEffect } from "react";
import CardInfo from "./_components/CardInfo";
import ChartDashboard from "./_components/ChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import axios from "axios";
import jwt from "jsonwebtoken";
import { toast } from "sonner";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const [permissions, setPermissionsList] = useState();

  useEffect(() => {
    getBudgetList();
  }, []);

  useEffect(() => {
    getExpensesList();
  }, []);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = () => {
    axios
      .get("/api/users")
      .then((res) => {
        const accessPerms = jwt.decode(res.data.user, { complete: true });
        const access = accessPerms.payload.permissions;
        setPermissionsList(access);
        console.log(accessPerms.payload.permissions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /**
   * Get all Budget list
   */
  const getBudgetList = () => {
    axios
      .get("http://localhost:5000/api/budgets/")
      .then((responses) => {
        if (responses.status == 200) {
          console.log(responses.data);
          setBudgetList(responses.data);
        }
      })
      .catch((err) => console.error(err));
  };

  const getExpensesList = async () => {
    axios
      .get("http://localhost:5000/api/expenses/")
      .then((response) => {
        if (response.status == 200) {
          setExpensesList(response.data.expenses);
          console.log(response.data.expenses);
        }
      })
      .catch((err) => toast(" ❌ " + err.message));
  };

  return (
    <div className="p-5">
      {user ? (
        <div>
          <h2 className="font-bold text-3xl"> Hi, {user?.name} 👋</h2>
          <p className="text-gray-500">
            {" "}
            Here's what happen with your team's money, let's manage
          </p>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-3xl"> Hi, Guest 👋</h2>
          <p className="text-gray-500">
            {" "}
            Login to start manage the expense with us
          </p>
        </div>
      )}

      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <ChartDashboard budgetList={budgetList} />
          <h2 className="font-bold text-lg">Latest Expenses</h2>
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getExpensesList}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.budgets.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
