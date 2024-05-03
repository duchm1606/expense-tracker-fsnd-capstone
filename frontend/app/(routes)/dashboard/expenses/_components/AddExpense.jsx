import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetID, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addNewExpense = (budgetID) => {
    axios
      .post("http://localhost:5000/api/expenses/" + budgetID, {
        name: name,
        amount: amount,
      })
      .then((response) => {
        if (response.status == 200) {
          refreshData();
          toast("✅ Add new expense successfully");
        }
      })
      .catch((err) => toast(" ❌ " + err.message));
  };
  return (
    <div>
      <h2 className="font-bold text-lg">AddExpense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Amount</h2>
        <Input
          placeholder="e.g. 1000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        onClick={() => addNewExpense(budgetID)}
        disabled={!(name && amount)}
        className="mt-3 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
