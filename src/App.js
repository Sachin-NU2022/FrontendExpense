import React from 'react';
import EmployeeList from './Component/Employee/employeeList.component';
import ExpenseCategoryList from './Component/ExpenseCategory/expensecategorylist.component';
import Home from './Component/Home/home.component';
import { Routes, Route } from 'react-router-dom';
import DepartmentList from './Component/DepartmentComponent/departmentList.component';
import DivisionList from './Component/DivisionComponent/divisionList.component';
import EditEmployeeList from './Component/Employee/editEmployeeList.component';
import PrivateRoute from './Component/PrivateRoute';
import LoginUp from './Component/Login/loginup.component';
import EditExpenseList from './Component/Expense/editExpenseList.component';
import EditDepartmentList from './Component/DepartmentComponent/editDepartmentList.component';
import EditExpenseCategory from './Component/ExpenseCategory/editExpenseCategory.component';
import ExpenseListSearch from './Component/ExpenseListSearch/expenseListSearch.component';

const App = () => {
  return (
    <div className='bodydesign'>
      <Routes>
          <Route element={<PrivateRoute />}>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/emplist" element={<EmployeeList />} />
              <Route exact path='/emplist/:id' element={<EditEmployeeList />} />
              <Route exact path="/explist" element={<ExpenseListSearch/>} />
              <Route exact path='/explist/:id' element={<EditExpenseList />} />
              <Route exact path="/expcatlist" element={<ExpenseCategoryList />} />
              <Route exact path="/expcatlist/:id" element={<EditExpenseCategory />} />
              <Route exact path="/departlist" element={<DepartmentList />} />
              <Route exact path="/departlist/:id" element={<EditDepartmentList />} />
              <Route exact path="/divlist" element={<DivisionList />} />
          </Route>
              <Route exact path='/'element={<LoginUp />} />
              <Route exact path="/login" element={<LoginUp />} />
      </Routes>
    </div>
  )
}
export default App;
