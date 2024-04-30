'use client'
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'

function ExpenseIndexes() {

    const [expensesList, setExpensesList] = useState([])

    useEffect(()=>{
        getExpensesList()
      }, [])
    const getExpensesList = async()=>{
        const result = [{
            id: 1,
            name: 'test',
            amount: 100,
            createdAt: '20/4/23',
        }]
        setExpensesList(result)
        }
    return (
        <div className='p-5'>
            <h2 className='font-bold text-lg'>All Expenses</h2>
            <ExpenseListTable expensesList={expensesList} refreshData={getExpensesList}/>
        </div>
    )
}

export default ExpenseIndexes