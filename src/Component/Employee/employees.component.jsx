import React, {useState} from 'react';
import Employee from './employee.component';
import "./employees.css";

const Employees = ({ employees }) => {
         return(
                <div>
                  <table>
                  <thead>
                    <tr>
                       <th className='secondwidth'>社員番号</th>
                       <th className='thirdwidth'>氏名</th>
                       <th className='fourthwidth'>フリガナ</th>
                       <th className='fifthwidth'>所属部署</th>
                       <th className='sixwidth'>所属課 </th>
                       <th className='sevenwidth'>メールアドレス</th>
                       <th className='eightwidth'>アクション</th> 
                    </tr>
                  </thead>
                  <tbody>
                     {
                       employees.length ? employees.map(
                        employee => <Employee key={employees.employee_id} employee={employee} />
                        ) :
                       <div style={{ color: 'red', width: "500px", height:"70px", padding: "20px"}}>検索データが見つかりません。。。</div>
                       } 
                  </tbody>
                  </table>
                 
                  </div>
               )
}
export default Employees;