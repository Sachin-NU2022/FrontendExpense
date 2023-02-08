import React, { useEffect, useState } from 'react';
import { Button, Container, FormGroup, Label, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import clsx from "clsx";
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import styles from './employeeRegistration.css';
import { useEmployeeFormValidators } from "./hooks/useEmployeeFormValidators";
import { FaEdit } from "react-icons/fa";
import './employee.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Employee = ({ employee: { staffNumber, password, employee_id, username, staff_kana, department_name, division_name, email, del_flg } }) => {
   


   // Modal open state
   const [modal, setModal] = React.useState(false);

   // Toggle for Modal
   const toggle = () => {
      loadEmployeeList();
      setModal(!modal);
   }

   let navigate = useNavigate();
   const reload=()=>window.location.reload();
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

   useEffect(() => {
      document.title = "Update Employee || Expense management System"
   }, []);

   const [employee, setEmployee] = useState({});
   const { errors, validateForm} = useEmployeeFormValidators(employee);

   const loadEmployeeList = () => {
      axios.get(`${base_url}/api/auth/search/${employee_id}`).then(
         (response) => {
            console.log(response.data);
            setEmployee(response.data);
         }, (error) => {
            console.log(error);
         }
      )
   }

   const onUpdateField = e => {
      const field = e.target.name;
      const nextFormState = {
         ...employee,
         [field]: e.target.value,
      };
      setEmployee(nextFormState);
   };

   const handleChange = e => {
      e.preventDefault();
      console.log("update button is clicked")
      const { isValid } = validateForm({ employee, errors, forceTouchErrors: true });
      if (!isValid) return;
      alert(JSON.stringify(employee, null, 2));
      postDatatoServer(employee);
      e.target.reset();
   };

   // creating function to postdata on server
   const postDatatoServer = (data) => {
      axios.put(`${base_url}/api/auth/update/${employee_id}`, data).then(
         (response) => {
            console.log(response);
            toggle();
            reload();
         }, (error) => {
            console.log(error);
         }
      )
   } 
  
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
     axios.put(`${base_url}/api/auth/delete/${data.employee_id}`, data).then(
          (response) => {
              console.log("employee deleted successfully");
              //setModal(!modal);
              reload();
          },(error) => {
              console.log(error);
          }
      )
   }

   return (
         <tr key={staffNumber}>
         {
         del_flg ? 
         <td style={{background : "#FA8072", color : "#212666"}} >
            {staffNumber}
         </td>
          : 
         <td style={{background : "#f5f5f5"}}>
            {staffNumber}
         </td>
         }
         <td>{username}</td>
         <td>{staff_kana}</td>
         <td>{department_name }</td>
         <td>{division_name}</td>
         <td>{email}</td>
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
                              <Form onSubmit={handleChange} className="registerform">
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label>社員番号</Label>
                                          <input
                                             className={clsx(
                                                styles.formField,
                                                errors.staffNumber.dirty &&
                                                errors.staffNumber.error &&
                                                styles.formFieldError
                                             )}
                                             type="text"
                                             aria-label="ID field"
                                             name="staffNumber"
                                             defaultValue={staffNumber}
                                             onChange={onUpdateField}
                                          />
                                          {errors.staffNumber.dirty && errors.staffNumber.error ? (
                                             <p className="formFieldErrorMessage">
                                                {errors.staffNumber.message}
                                             </p>
                                          ) : null}

                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label>メールアドレス</Label>
                                          <input
                                             className={clsx(
                                                styles.formField,
                                                errors.email.dirty && errors.email.error && styles.formFieldError
                                             )}
                                             type="text"
                                             aria-label="Email field"
                                             name="email"
                                             defaultValue={email}
                                             onChange={onUpdateField}
                                          />
                                          {errors.email.dirty && errors.email.error ? (
                                             <p className="formFieldErrorMessage">{errors.email.message}</p>
                                          ) : null}
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label>氏名</Label>
                                          <input
                                             className={clsx(
                                                styles.formField,
                                                errors.username.dirty && errors.username.error && styles.formFieldError
                                             )}
                                             type="text"
                                             aria-label="name field"
                                             name="username"
                                             defaultValue={username}
                                             onChange={onUpdateField}
                                          />
                                          {errors.username.dirty && errors.username.error ? (
                                             <p className="formFieldErrorMessage">
                                                {errors.username.message}
                                             </p>
                                          ) : null}
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label>フリガナ</Label>
                                          <input
                                             className={clsx(
                                                styles.formField,
                                                errors.staff_kana.dirty && errors.staff_kana.error && styles.formFieldError
                                             )}
                                             type="text"
                                             aria-label="furigana field"
                                             name="staff_kana"
                                             defaultValue={staff_kana}
                                             onChange={onUpdateField}
                                          />
                                          {errors.staff_kana.dirty && errors.staff_kana.error ? (
                                             <p className="formFieldErrorMessage">
                                                {errors.staff_kana.message}
                                             </p>
                                          ) : null}
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label>所属部署</Label>
                                          <Form.Select aria-label="Default select example" defaultValue={department_name} onChange={(e) => { setEmployee({ ...employee, department_name: e.target.value }) }} className="form-control registerinputdesign" required>
                                            {optionList.map((item) => (
                                                    <option key={item.department_id} value={item.department_name}>
                                                         {item.department_name}
                                                    </option>
                                             ))}
                                          </Form.Select>
                                       </FormGroup>
                                    </Col>
                                    <Col md="6">
                                       <FormGroup>
                                          <Label>所属課</Label>
                                          <Form.Select aria-label="Default select example" defaultValue={division_name} onChange={(e) => { setEmployee({ ...employee, division_name: e.target.value }) }} className="form-control registerinputdesign" required>
                                             {optionDivList.map((item) => (
                                                    <option key={item.division_id} value={item.division_name}>
                                                         {item.division_name}
                                                    </option>
                                             ))}
                                          </Form.Select>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row className='marregtop'>
                                    <Col md="2">
                                       <Button type="submit" className="updatebtn">更新</Button>
                                    </Col>
                                    <Col md="8">
                                    </Col>
                                    {
                                       del_flg ? 
                                       <Col md="2">
                                           <Button onClick={() => {submit(employee)}} className="deletebtn">復元</Button> 
                                       </Col> : 
                                       <Col md="2">
                                           <Button onClick={() => {submit(employee)}} className="deletebtn">削除</Button> 
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
export default Employee;