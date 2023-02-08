import React from 'react';
import Expense from './expense.component';
import './expenses.css';

const Expenses = ({ expenses}) => {
        
         return(
                <div>
                  <table>
                  <thead>
                    <tr>
                       <th className='firstadjustablewidth'>部署</th>
                       <th>課</th>
                       <th>摘要欄</th>
                       <th>支払先</th>
                       <th>乗車駅</th>
                       <th>降車駅</th>
                       <th className='secondadjustablewidth'>金額</th>
                       <th>備考</th>
                       <th className='thirdadjustablewidth'>アクション</th>
                    </tr>
                  </thead>
                  <tbody>
                     {
                       expenses.length ? expenses.map(expense => <Expense key={expense.expense_id} expense={expense} />) : "No data found"
                     }
                  </tbody>
                  </table>
                 
                  </div>
               )
}
export default Expenses;