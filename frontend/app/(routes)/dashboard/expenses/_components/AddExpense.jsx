import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetID, refreshData}) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addNewExpense = (budgetID)=>{
    //Add new records
    refreshData()
    toast('✅ Ok')
  }
  return (
    <div>
        <h2 className='font-bold text-lg'>AddExpense</h2>
        <div className='mt-2'>
            <h2 className='text-black font-medium my-1'>Expense Name</h2>
            <Input placeholder="e.g. Bedroom Decor" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='mt-2'>
            <h2 className='text-black font-medium my-1'>Amount</h2>
            <Input placeholder="e.g. 1000" onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <Button onClick={()=>addNewExpense()} 
        disabled={!(name&&amount)} className="mt-3 w-full">Add New Expense</Button>
    </div>
    
  )
}

export default AddExpense