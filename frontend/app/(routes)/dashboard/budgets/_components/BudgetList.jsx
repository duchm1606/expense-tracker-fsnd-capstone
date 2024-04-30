"use client"
import {React, useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'

function BudgetList() {
  const [budgetList, setBudgetList] = useState([])

  useEffect(()=>{
    getBudgetList()
  }, [])

  const getBudgetList = ()=>{
    let result = [
      {
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
      },
    ]
    setBudgetList(result)
  }


  return (
    <div className='mt-7'>
        <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <CreateBudget
            refreshData={()=>getBudgetList()}/>
            { budgetList?.length > 0 ? budgetList.map((budget,index) => (
              <BudgetItem budget={budget}/>
            ))
          : [1,2,3,4,5].map((item, index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'/> 
          ))}
        </div>
    </div>
  )
}

export default BudgetList