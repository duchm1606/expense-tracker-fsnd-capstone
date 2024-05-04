"use client";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useUser } from "@auth0/nextjs-auth0/client";

function Expenses({ params }) {
  const { user } = useUser();
  const [permissions, setPermissionsList] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState({
    id: 0,
    name: "",
    icon: "",
    totalSpend: 0,
    totalItem: 0,
    amount: 0,
    expenses: [],
  });
  const [accessToken, setAccessToken] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getBudgetInfo();
  }, []);

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    getAccessToken();
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

  const getAccessToken = () => {
    if (user) {
      axios
        .get("/api/users")
        .then((res) => {
          setAccessToken(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /**
   * Fetch data from beckend server
   */
  const getBudgetInfo = async () => {
    axios
      .get("http://localhost:5000/api/expenses/" + params.id)
      .then((response) => {
        if (response.status == 200) {
          //   console.log(response.data);
          setBudgetInfo(response.data);
        }
      })
      .catch((err) => toast(" ❌ " + err.message));
  };

  const deleteBudget = async () => {
    axios
      .delete("http://localhost:5000/api/budgets/" + params.id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          toast("✅ Budgets cleared successfully");
          router.replace("/dashboard/budgets");
        }
      })
      .catch((err) => toast(" ❌ " + err.message));
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          {permissions.includes("patch:budget") && (
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={() => getBudgetInfo()}
            />
          )}
          {permissions.includes("delete:budgets") && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex gap-2" variant="destructive">
                  <Trash />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your current budget along with expenses and remove your data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteBudget()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse" />
        )}
        {permissions.includes("post:expenses") && (
          <AddExpense
            budgetID={params.id}
            refreshData={() => getBudgetInfo()}
          />
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expensesList={budgetInfo.expenses}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default Expenses;
