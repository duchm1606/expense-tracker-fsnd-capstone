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
    // const result = [
    //   {
    //     id: 1,
    //     name: "test",
    //     amount: 100,
    //     createdAt: "20/4/23",
    //   },
    // ];
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
      <h2 className="font-bold text-lg">All Expenses</h2>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={getExpensesList}
      />
    </div>
  );
}

export default ExpenseIndexes;
