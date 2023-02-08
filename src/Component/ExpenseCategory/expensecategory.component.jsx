import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col, Modal, ModalHeader, ModalBody, FormGroup, Input} from 'reactstrap';
import base_url from '../../api/bootapi';
import Form from 'react-bootstrap/Form';
import './expensecategoryregister.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { FaEdit} from "react-icons/fa";
import './expensecategory.css';
import { useFormValidCat } from "./categoryvalidator";
import ExpenseCategories from './expensecategories.component';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './expensecategory.css';

const ExpenseCategory = ({expensecategory:{expense_cat_id, expense_category_name, del_flg}}) => {
    // Modal open state
   const [modal, setModal] = React.useState(false);
   // Toggle for Modal
   const toggle = () => {
               loadExpenseCategoryList();
               setModal(!modal);
              
   }
   const reload=()=>window.location.reload();
  
   let navigate = useNavigate();
   
   useEffect(() => {
       document.title = "Expense Category || Expense Category Registration Form";
      
   }, []);

    // getting login Id from session storage
    let fetchData = sessionStorage.getItem("loginID");
    let userData = JSON.parse(fetchData);

    const [category, setCategory] = useState({});
    const { errors, validationForm } = useFormValidCat(category);
    const loadExpenseCategoryList = () => {
        axios.get(`${base_url}/api/expensecat/search/${expense_cat_id}`).then(
         (response) => {
             console.log(response.data);
             setCategory(response.data);
         },
         (error) => {
             console.log(error);
         })
    }
    const onUpdateField = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...category, [field]: e.target.value
        };
        setCategory(nextFormState);
        
    }
    const handleForm = (e) => {
       e.preventDefault();
       console.log(category);
       console.log("update is clicked");
       const { isValid } = validationForm({ category, errors, forceTouchErrors: true });
       if (!isValid) return;
       alert(JSON.stringify(category, null, 2));
       postDatatoServer(category);
     
       e.target.reset();
    }
    const postDatatoServer = (data) => {
       axios.put(`${base_url}/api/expensecat/update/${expense_cat_id}`, data).then(
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
        axios.put(`${base_url}/api/expensecat/delete/${data.expense_cat_id}`, data).then(
            (response) => {
                console.log("expensecategory deleted successfully");
                
                reload();
            },(error) => {
                console.log(error);
            }
        )
    }
    return(
           <tr key={expense_cat_id}>
            {
           del_flg ? 
           <td style={{background : "#FA8072", color : "#212666"}} >
           {expense_cat_id}
           </td>
            : 
           <td style={{background : "#f5f5f5"}}>
            {expense_cat_id}
           </td>
            }
           <td>{expense_category_name}</td>
           <td>
                <Container>
                    <Row>
                        <Col md="12">
                                <Button className='editbtn' onClick={toggle}><FaEdit className='editicon'/></Button>
                                <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                                <ModalHeader toggle={toggle}>
                                    <h1 className='headingdesigncategory'>経費カテゴリの更新</h1>
                                </ModalHeader>
                                <ModalBody>
                                <Container>
                                        <Form onSubmit={handleForm} className="catregisterform">
                                            <Row>
                                                <Col md="12">
                                                <FormGroup>
                                                         <label>カテゴリー名</label><br />
                                                         <Input type="text" id="expense_category_name" name="expense_category_name" defaultValue={category.expense_category_name} value={category.expense_category_name} onChange={onUpdateField} className="inputdesign" />
                                                         {errors.expense_category_name.dirty && errors.expense_category_name.error ? (<span style={{ color: "red" }}>{errors.expense_category_name.message}</span>) : null}
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
                                                       <Button onClick={() => {submit(category)}} className="deletebtn">復元</Button> 
                                                    </Col> : 
                                                    <Col md="2">
                                                        <Button onClick={() => {submit(category)}} className="deletebtn">削除</Button> 
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

export default ExpenseCategory;