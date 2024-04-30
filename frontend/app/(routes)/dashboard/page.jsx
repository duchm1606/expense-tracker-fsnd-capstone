"use client"
import { useUser } from '@auth0/nextjs-auth0/client'
import {React, useState, useEffect} from 'react'
import CardInfo from './_components/CardInfo';
import ChartDashboard from './_components/ChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const {user}=useUser();
  const [budgetList, setBudgetList] = useState()
  const [expensesList, setExpensesList] = useState([])

  useEffect(()=>{
    getBudgetList()
  }, [])

  useEffect(()=>{
    getExpensesList()
  }, [])

  /**
   * Get all Budget list
   */
  const getBudgetList = ()=>{
    let result = {
      numOfBudget: 2,
      totalBudget: 3000,
      totalSpend: 1005,
      budgets: [{
        id: 1,
        name: 'hi',
        icon: '🚗',
        totalSpend: 1000,
        totalItem: 10,
        amount: 2000
      },
      {
        id: 2,
        name: 'hi',
        icon: '🚗',
        totalSpend: 5,
        totalItem: 6,
        amount: 1100
      }] 
    }
      
    setBudgetList(result)
  }

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
      <h2 className='font-bold text-3xl'> Hi, {user?.name} 👋</h2>
      <p className='text-gray-500'> Here's what happen with your team's money, let's manage</p>
      <CardInfo budgetList={budgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <ChartDashboard
            budgetList = {budgetList}
          />
          <h2 className='font-bold text-lg'>Latest Expenses</h2>
          <ExpenseListTable expensesList={expensesList} refreshData={getExpensesList}/>
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList?.budgets.map((budget,index)=>(
            <BudgetItem budget={budget} key = {index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard