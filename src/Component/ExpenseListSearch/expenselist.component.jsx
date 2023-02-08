import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormGroup, Input, Button, Container, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { useExpenseFormValidators } from "./hooks/useExpenseFormValidators";
import clsx from "clsx";
import styles from './expenseListSearch.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ExpenseList = ({ expense: { expense_id, app_depart_id, app_division_id, description, payment_destination, entraining_point, arrival_station, amount, note, application_user_name, app_date, approval_status, pay_date, payment_status, application_date, staff_id, del_flg } }) => {
  
   // Modal open state
   const [modal, setModal] = React.useState(false);

   // Toggle for Modal
   const toggle = () => {
                         loadExpenseList();
                         setModal(!modal);
   }

   const reload=()=>window.location.reload();
   let navigate = useNavigate();

   useEffect(() => {
      document.title = "Update Expense || Expense management System"
   }, []);

   const [optionList,setOptionList] = useState([]);
   const [optionDivList,setOptionDivList] = useState([]);
  
   const fetchOptionData = () => {
       axios.get(`${base_url}/api/department/search`)
         .then((response) => {
           const { data } = response;
           if(response.status === 200){
               //check the api call is success by stats code 200,201 ...etc
               setOptionList(data)
           }else{
               //error handle section 
           }
         })
         .catch((error) => console.log(error));
     };
   
     const fetchOptionDiv = () => {
       axios.get(`${base_url}/api/division/search`)
         .then((response) => {
           const { data } = response;
           if(response.status === 200){
               //check the api call is success by stats code 200,201 ...etc
               setOptionDivList(data)
           }else{
               //error handle section 
           }
         })
         .catch((error) => console.log(error));
     };

     useEffect(() => {
            fetchOptionData();
            fetchOptionDiv();
     }, [])

    const [expense, setExpense] = useState({});
    const { errors, validateForm} = useExpenseFormValidators(expense);
  
 
    const loadExpenseList = () => {
      axios.get(`${base_url}/api/expense/search/${expense_id}`).then(
         (response) => {
            console.log(response.data);
            setExpense(response.data);
         }, (error) => {
            console.log(error);
         }
      )
    }
    const onUpdateField = e => {
      const field = e.target.name;
      const nextFormState = {
          ...expense,
          [field]: e.target.value,
      };
      setExpense(nextFormState);
    };
    const handleForm = e => {
      e.preventDefault();
      const { isValid } = validateForm({ expense, errors, forceTouchErrors: true });
      if (!isValid) return;
      alert(JSON.stringify(expense, null, 2));
      postDatatoServer(expense);
      e.target.reset();
    };

    // creating function to postdata on server
    const postDatatoServer = (data) => {
        axios.put(`${base_url}/api/expense/update/${expense_id}`, data).then(
            (response) => {
               console.log(response);
               toggle();
               reload();
            }, (error) => {
               console.log(error);
         }
      )
   };

   const submit = (data) => {
      let message = del_flg ? "復元" : "削除"
      toggle();
      confirmAlert({
        message: <h2>本当に{message}しますか?</h2>,
        buttons: [
          {
            label: 'はい',
            onClick: () => handleDelete(data)
          },
          {
            label: 'いいえ',
            //onClick: () => alert('Click No')
          }
        ]
      });
   }

   const handleDelete = (data) => {
      axios.put(`${base_url}/api/expense/delete/${data.expense_id}`, data).then(
          (response) => {
              console.log("expense deleted successfully", response.data);
              reload();
          },(error) => {
              console.log(error);
          }
      )
  }
   
   let fetchData = sessionStorage.getItem("loginID");
   let userData = JSON.parse(fetchData);

   return (
      <tr key={expense_id}>
         {
            del_flg ? 
            <td style={{background : "#FA8072"}} className="pad">
              {staff_id}
            </td> :
            <td style={{background : "#F5F5F5"}} className="pad">
              {staff_id}
            </td>
         }
         <td className='pad'>
           {application_user_name} 
         </td>
         <td className='pad'>{app_date}</td>
         <td className='pad'>{approval_status == 1 ? '承認済み': '保留中'}</td>
         <td className='pad'>{pay_date}</td>
         <td className='pad'>{payment_status == 1 ? '支払った' : '未払い'}</td>
         <td className='pad'>{application_date}</td>
         <td>
            <Container>
               <Row>
                  <Col md="12">
                     <Button className='editbtn' onClick={toggle}><FaEdit className='editicon' /></Button>
                     <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                        <ModalHeader toggle={toggle}>
                           <h1 className='heading-titlee'>従業員の更新</h1>
                        </ModalHeader>
                        <ModalBody>
                           <Container className='container'>
                              <Form onSubmit={handleForm} className="registerform">
                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>所属部署</Label>
                                          <select aria-label="Default select example" name="app_depart_id" defaultValue={app_depart_id} onChange={(e) => { setExpense({ ...expense, app_depart_id: e.target.value }) }} className="form-control expinputformdesign" required>
                                               {optionList.map((item) => (
                                                    <option key={item.department_id} value={item.department_name}>
                                                         {item.department_name}
                                                    </option>
                                                 ))}
                                          </select>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>所属課</Label>
                                          <select aria-label="Default select example" name="app_division_id" defaultValue={app_division_id} onChange={(e) => { setExpense({ ...expense, app_division_id: e.target.value }) }} className="form-control expinputformdesign" required>
                                                {optionDivList.map((item) => (
                                                    <option key={item.division_id} value={item.division_name}>
                                                         {item.division_name}
                                                    </option>
                                               ))}
                                          </select>
                                       </FormGroup>
                                    </Col>
                                 </Row> 
                                 <Row>
                                    <Col md="12">
                                    <FormGroup>
                                          <Label>摘要</Label>
                                          <input
                                             className={clsx(
                                             styles.formField,
                                             errors.description.dirty &&
                                             errors.description.error &&
                                             styles.formFieldError
                                             )}
                                             type="text"
                                             aria-label="description field"
                                             name="description"
                                             defaultValue={description}
                                             onChange={onUpdateField}
                                              />
                                             {errors.description.dirty && errors.description.error ? (
                                             <p className="formFieldErrorMessage">
                                                 {errors.description.message}
                                             </p>
                                             ) : null}
                                    </FormGroup>
                                    </Col>
                                 </Row> 
                                 <Row>
                                    <Col md="12">
                                    <FormGroup>
                                          <Label>支払先</Label>
                                          <input
                                             className={clsx(
                                                 styles.formField,
                                                 errors.payment_destination.dirty &&
                                                 errors.payment_destination.error &&
                                                 styles.formFieldError
                                             )}
                                             type="text"
                                             aria-label="payment_destination field"
                                             name="payment_destination"
                                             defaultValue={payment_destination}
                                             onChange={onUpdateField}
                                            />
                                           {errors.payment_destination.dirty && errors.payment_destination.error ? (
                                           <p className="formFieldErrorMessage">
                                                {errors.payment_destination.message}
                                           </p>
                                           ) : null}
                                    </FormGroup>
                                    </Col>
                                 </Row> 
                                 <Row>
                                    <Col md="5">
                                    <FormGroup>
                                          <Label>乗車駅</Label>
                                            <input
                                              className={clsx(
                                                styles.formField,
                                                  errors.entraining_point.dirty &&
                                                  errors.entraining_point.error &&
                                                  styles.formFieldError
                                                  )}
                                                  type="text"
                                                  aria-label="entraining_point field"
                                                  name="entraining_point"
                                                  defaultValue={entraining_point}
                                                  onChange={onUpdateField}
                                            />
                                            {errors.entraining_point.dirty && errors.entraining_point.error ? (
                                                <p className="formFieldErrorMessage">
                                                  {errors.entraining_point.message}
                                                </p>
                                            ) : null}
                                     </FormGroup>
                                    </Col>
                                    <Col md="2"><h1 className="designbreakbar">~</h1></Col>
                                    <Col md="5">
                                    <FormGroup>
                                        <Label>降車駅</Label>
                                             <input
                                                className={clsx(
                                                   styles.formField,
                                                   errors.arrival_station.dirty &&
                                                   errors.arrival_station.error &&
                                                   styles.formFieldError
                                                  )}
                                                  type="text"
                                                  aria-label="arrival_station field"
                                                  name="arrival_station"
                                                  defaultValue={arrival_station}
                                                  onChange={onUpdateField}
                                             />
                                             {errors.arrival_station.dirty && errors.arrival_station.error ? (
                                             <p className="formFieldErrorMessage">
                                                 {errors.arrival_station.message}
                                             </p>
                                             ) : null}
                                    </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="12">
                                    <FormGroup>
                                          <Label>金額</Label>
                                              <input
                                                 className={clsx(
                                                   styles.formField,
                                                   errors.amount.dirty &&
                                                   errors.amount.error &&
                                                   styles.formFieldError
                                                    )}
                                                   type="text"
                                                   aria-label="amount field"
                                                   name="amount"
                                                   defaultValue={amount}
                                                   onChange={onUpdateField}
                                                   />
                                              {errors.amount.dirty && errors.amount.error ? (
                                              <p className="formFieldErrorMessage">
                                                   {errors.amount.message}
                                              </p>
                                              ) : null}
                                     </FormGroup>
                                    </Col>
                                 </Row> 
                                    <Row>
                                    <Col md="12">
                                    <FormGroup>
                                           <Label>備考</Label>
                                           <input
                                           className={clsx(
                                               styles.formField,
                                               errors.note.dirty &&
                                               errors.note.error &&
                                               styles.formFieldError
                                               )}
                                              type="text"
                                              aria-label="note field"
                                              name="note"
                                              defaultValue={note}
                                              onChange={onUpdateField}
                                              />
                                             {errors.note.dirty && errors.note.error ? (
                                             <p className="formFieldErrorMessage">
                                                  {errors.note.message}
                                             </p>
                                             ) : null}
                                    </FormGroup>
                                    </Col>
                                    </Row> 
                                     {
                                      userData.staffNumber === "1" ? 
                                      <Row>
                                      <Col md="6">
                                      <Form.Group className='mb-3'>
                                          <Form.Label>支払日</Form.Label>
                                          <Form.Control type='date' className="formdesigninput" defaultValue={app_date} onChange={(e) => {setExpense({ ...expense, app_date: e.target.value })}}/>
                                      </Form.Group>
                                      </Col>
                                      <Col md="6">
                                      <Form.Group className='mb-3'>
                                          <Form.Label>決裁月</Form.Label>
                                          <Form.Control type='date' className="formdesigninput" defaultValue={pay_date} onChange={(e) => {setExpense({ ...expense, pay_date: e.target.value })}}/>
                                      </Form.Group>
                                      </Col>
                                   </Row> : ""

                                 }
                              

                                 {
                                    userData.staffNumber === "1" ? 
                                    <Row>
                                    <Col md="6">
                                    <FormGroup>
                                          <Label>決裁状態</Label>
                                          <select aria-label="Default select example" defaultValue={expense.payment_status} name="payment_status" onChange={(e) => { setExpense({ ...expense, payment_status: e.target.value }) }} className="form-control expinputformdesign" required>
                                             <option value="1">承認済み</option>
                                             <option value="0">保留中</option>
                                          </select>
                                    </FormGroup>
                                    </Col>
                                    <Col md="6">
                                    <FormGroup>
                                          <Label>支払状況</Label>
                                          <select aria-label="Default select example" defaultValue={expense.approval_status} name="approval_status" onChange={(e) => { setExpense({ ...expense, approval_status: e.target.value }) }} className="form-control expinputformdesign" required>
                                             <option value="1">支払った</option>
                                             <option value="0">未払い</option>
                                          </select>
                                    </FormGroup>
                                    </Col>
                                 </Row> : ""
                                 }
                              
                    
                                 <Row className='marregtop'>
                                    <Col md="2">
                                       <Button type="submit" className="updatebtn">更新</Button>
                                    </Col>
                                    <Col md="8">
                                    </Col>
                                    {
                                       del_flg ? 
                                       <Col md="2">
                                            <Button onClick={() => {submit(expense)}} className="deletebtn">復元</Button> 
                                       </Col> : 
                                       <Col md="2">
                                            <Button onClick={() => {submit(expense)}} className="deletebtn">削除</Button> 
                                       </Col>
                                    }
                                 </Row>
                              </Form>
                           </Container>
                        </ModalBody>
                     </Modal>
                  </Col>
               </Row>
            </Container>
         </td>
      </tr>
   )
}
export default ExpenseList;