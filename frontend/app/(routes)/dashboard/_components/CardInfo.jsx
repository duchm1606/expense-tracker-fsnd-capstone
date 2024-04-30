import { PiggyBank } from 'lucide-react'
import React from 'react'

function CardInfo({budgetList}) {
  return (
    <div> {budgetList? 
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Total Budget</h2>
                <h2 className='font-bold text-2xl'>${budgetList?.totalBudget}</h2>
            </div>
            <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Total Spend</h2>
                <h2 className='font-bold text-2xl'>${budgetList?.totalSpend}</h2>
            </div>
            <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Nums of Budget(s)</h2>
                <h2 className='font-bold text-2xl'>{budgetList?.numOfBudget}</h2>
            </div>
            <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
        </div>
    </div>
    : 
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {[1,2,3].map((item,index)=>(
            <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'/>
        ))}
    </div>
    }
    </div>
        
  )
}

export default CardInfo