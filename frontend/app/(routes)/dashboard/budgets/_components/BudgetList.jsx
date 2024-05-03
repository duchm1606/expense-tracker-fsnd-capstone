"use client";
import { React, useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useUser } from "@auth0/nextjs-auth0/client";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  const [permissions, setPermissionsList] = useState([]);

  useEffect(() => {
    getBudgetList();
  }, []);

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

  const getBudgetList = () => {
    axios
      .get("http://localhost:5000/api/budgets/")
      .then((responses) => {
        if (responses.status == 200) {
          setBudgetList(responses.data.budgets);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mt-7">
      <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {permissions.includes("post:budgets") && (
          <CreateBudget refreshData={() => getBudgetList()} />
        )}

        {budgetList?.length > 0
          ? budgetList.map((budget, index) => <BudgetItem budget={budget} />)
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              />
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
