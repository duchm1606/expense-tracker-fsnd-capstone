import React from 'react'
import { BarChart, Bar, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer, Rectangle } from 'recharts'


function ChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <ResponsiveContainer width={'100%'} height={350}>
      <BarChart 
        data={budgetList?.budgets}
        margin={{
          top:7,
        }}>
          <XAxis dataKey='name'/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey='totalSpend' fill='#4845d2' activeBar={<Rectangle fill="pink" stroke="blue" />}/>
          <Bar dataKey='amount' fill='#C3C2FF' activeBar={<Rectangle fill="pink" stroke="blue" />}/>
      </BarChart>
      </ResponsiveContainer>
     
    </div>
  )
}

export default ChartDashboard