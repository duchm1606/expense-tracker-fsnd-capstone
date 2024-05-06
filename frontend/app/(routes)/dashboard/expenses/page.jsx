"use client";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import axios from "axios";
import { toast } from "sonner";

function ExpenseIndexes() {
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    getExpensesList();
  }, []);

  const getExpensesList = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/`)
      .then((response) => {
        if (response.status == 200) {
          setExpensesList(response.data.expenses);
        }
      })
      .catch((err) => toast(" ❌ " + err.message));
  };
  return (
    <div className="p-5">
      <h2 className="font-bold text-lg">All Expenses</h2>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={getExpensesList}
      />
    </div>
  );
}

export default ExpenseIndexes;
