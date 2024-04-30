"use client"
import { useUser } from '@auth0/nextjs-auth0/client'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({expensesList, refreshData}) {
	const {user} = useUser()
	const deleteExpense=async(expenseId)=>{
		await console.log(expenseId)
		toast('Deleted the id '+expenseId)
		refreshData()
  	}
	return (
		<div className='mt-3'>
			<div className='grid grid-cols-4 bg-slate-200 p-2'>
				<h2 className='font-bold'>Name</h2>
				<h2 className='font-bold'>Amount</h2>
				<h2 className='font-bold'>Date</h2>
				<h2 className='font-bold'>Action</h2>
			</div>
			{expensesList.map((expense, index)=>(
				<div className='grid grid-cols-4 bg-slate-50 p-2'>
				<h2>{expense.name}</h2>
				<h2>{expense.amount}</h2>
				<h2>{expense.createdAt}</h2>
				<h2>
					<Trash className='text-red-600 cursor-pointer'
					onClick={()=>deleteExpense(expense.id)}/>
				</h2>
			</div>
			))}
		</div>
	)
}

export default ExpenseListTable