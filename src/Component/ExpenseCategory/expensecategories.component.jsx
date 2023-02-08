import React from 'react';
import ExpenseCategory from './expensecategory.component';
import "./expensecategory.css";

const ExpenseCategories = ({expensecategories}) => {
                       return(
                        <div>
                        <table>
                        <thead>
                          <tr>
                            <th className='firstcolwidth'>項番</th>
                            <th className='secondcolwidth'>項目名</th>
                            <th className='thirdcolwidth'>アクション</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          expensecategories.length ? expensecategories.map(expensecategory => <ExpenseCategory key={expensecategories.expense_cat_id} expensecategory={expensecategory} />) : 
                          <div style={{ color: 'red', width: "500px", height:"70px", padding: "20px"}}>検索データが見つかりません。。。</div>
                        }
                        </tbody>
                      </table>
                      </div>
                               
                       )
}

export default ExpenseCategories;