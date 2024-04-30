"use client"
import React, {useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash } from 'lucide-react';
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
  } from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';
  

function Expenses({params}) {
    const [budgetInfo, setBudgetInfo]=useState({ 
        id: 0,
        name: '???',
        icon: '',
        totalSpend: 0,
        totalItem: 0,
        amount: 0,
        expenses: [{
            id: 0,
            name: '',
            amount: 0,
            createdAt: '',
        }]
    });
    const router = useRouter()

    useEffect(()=>{
        getBudgetInfo();
    }, []);

    /**
     * Fetch data from beckend server
     */
    const getBudgetInfo=async()=>{
        /* Add request here*/
        const result = { 
            id: 1,
            name: 'hi',
            icon: '🚗',
            totalSpend: 5,
            totalItem: 10,
            amount: 2000,
            expenses: [{
                id: 1,
                name: 'test',
                amount: 100,
                createdAt: '20/4/23',
            }]
        };
        setBudgetInfo(result)
    }
    
    const deleteBudget=async()=>{
        /* Add delete behavior */
        toast('✅ Budgets cleared successfully')
        router.replace('/dashboard/budgets')
    }
    console.log(budgetInfo)
    return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold gap-2 flex justify-between items-center'>
            <span className='flex gap-2 items-center'>
                <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
                My Expenses 
            </span>
            <div className='flex gap-2 items-center'>
                <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()}/>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="flex gap-2" variant="destructive">
                            <Trash/>Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your current budget along with expenses 
                            and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </h2>
        

        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
            { budgetInfo? <BudgetItem
            budget={budgetInfo}
            /> : 
            <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'/>
            }
            <AddExpense budget={params.id} refreshData={() => getBudgetInfo()}/>
        </div>
        <div className='mt-4'>
            <h2 className='font-bold text-lg'>Latest Expenses</h2>
            <ExpenseListTable expensesList={budgetInfo.expenses} refreshData={() => getBudgetInfo()} />
        </div>
    </div>
  )
}

export default Expenses