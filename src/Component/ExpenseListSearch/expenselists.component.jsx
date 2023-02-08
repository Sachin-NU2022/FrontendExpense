import React from 'react';
import ExpenseList from './expenselist.component';

const ExpenseLists = ({ expenses }) => {
         return(
                <div>
                  <table>
                  <thead>
                    <tr>
                         <th>社員番号</th>
                         <th>氏名 </th>
                         <th>決裁月</th>
                         <th>承認状況</th>
                         <th>支払日</th>
                         <th>支払状況</th>
                         <th>申請日</th>
                         <th>アクション</th>
                    </tr>
                  </thead>
                  <tbody>
                         {
                           expenses.length ? expenses.map(expense => <ExpenseList key={expense.expense_id} expense={expense} />) : 
                           <div style={{ color: 'red', width: "500px", height:"70px", padding: "20px"}}>検索データが見つかりません。。。</div>
                         }

                       
                  </tbody>
                  </table>
                 
                  </div>
               )
}
export default ExpenseLists;