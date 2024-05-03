"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import jwt from "jsonwebtoken";

function ExpenseListTable({ expensesList, refreshData }) {
  const { user } = useUser();
  const [permissions, setPermissionsList] = useState([]);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = () => {
    if (user) {
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
    }
  };

  const deleteExpense = async (expenseId) => {
    await console.log(expenseId);
    toast("Deleted the id " + expenseId);
    refreshData();
  };
  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expense, index) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2">
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createAt}</h2>
          <h2>
            {permissions.includes("delete:expenses") && (
              <Trash
                className="text-red-600 cursor-pointer"
                onClick={() => deleteExpense(expense.id)}
              />
            )}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
