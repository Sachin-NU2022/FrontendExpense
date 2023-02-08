import React from 'react';
import { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Button, Container, Row, Col, Label } from 'reactstrap';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import base_url from '../../api/bootapi';
import ExpenseCategories from './expensecategories.component';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import './expensecategorylist.css';
import Pagination from '../Employee/pagination.component';
import Navbar from '../../Component/navbar/Navbar.component';
import Sidebar from '../../Component/sidebar/sidebar.component';
import { useFormValidCat } from "./categoryvalidator";


const ExpenseCategoryList = () => {
   let navigate = useNavigate();
   const [currentPage, setCurrentPage] = useState(1);
   const [recordsPerPage] = useState(5);

   // Modal open state
   const [modal, setModal] = React.useState(false);
   // Toggle for Modal
   const toggle = () => {

      setModal(!modal);
   }
   const reload=()=>window.location.reload();
   useEffect(() => {
      document.title = "Expense Category List || Expense Management System";
   }, []);

   // Function to calling server
   const getExpenseCatListFromServer = () => {
      axios.get(`${base_url}/api/expensecat/search`).then(
         (response) => {
            console.log(response.data);
            setExpenseCategories(response.data);
         },
         (error) => {
            console.log(error);
         }
      )
   }
   useEffect(() => {
      getExpenseCatListFromServer();
   }, [])


   const handleSearch = (e) => {
      e.preventDefault();
      const expcatname = e.target.elements.expense_category_name.value;
      getSearchExpenseCatListFromServer(expcatname);
      e.target.reset();
   }

   const getSearchExpenseCatListFromServer = (searchdata) => {
      axios.get(`${base_url}/api/expensecat/kensaku?query=${searchdata}`).then(
         (response) => {
            console.log(response.data);
            setCurrentPage(1);
            setExpenseCategories(response.data);
         },
         (error) => {
            console.log(error);
         }
      )
   }

   const [expensecategories, setExpenseCategories] = useState([]);
   const indexOfLastRecord = currentPage * recordsPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
   const currentRecords = expensecategories.slice(indexOfFirstRecord, indexOfLastRecord);
   const nPages = Math.ceil(expensecategories.length / recordsPerPage);


   const [category, setCategory] = useState({});
   const { errors, validationForm} = useFormValidCat(category);
    const onUpdateField = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...category, [field]: e.target.value
        };
        setCategory(nextFormState);
    }

   const handleForm = (e) => {
      e.preventDefault();
      const { isValid } = validationForm({ category, errors, forceTouchErrors: true });
      if (!isValid) return;
      alert(JSON.stringify(category, null, 2));
      console.log(category);
      postDatatoServer(category);
      e.target.reset();
   }

   const postDatatoServer = (data) => {
      axios.post(`${base_url}/api/expensecat/register`, data).then(
         (response) => {
            console.log(response);
            navigate("/expcatlist");
            toggle();
            reload();
         }, (error) => {
            console.log(error);
         }
      )
   }



   return (
      <div className='home'>
         <Sidebar />
         <div className='homeContainer'>
            <Navbar />
            <div className='bodydesign'>
               <div className='expensecatlistmaindiv'>
                  <Container>
                     <Form onSubmit={handleSearch} className='expensecatlistmainform'>
                        <Row>
                           <Col md="12" className='searchinnerbody'>
                              <Label>項目名</Label>
                              <Input type="search" id="" name="expense_category_name" placeholder="Search Category" className='listinputdesign' />
                           </Col>
                        </Row>
                        <Row>
                           <Col md="2">
                              <Row>
                                 <Col md="6">
                                    <Button type="submit" className="searchbtn">検索</Button>
                                 </Col>
                                 <Col md="6">
                                    <Button type="reset" className="clearbtn">クリア</Button>
                                 </Col>
                              </Row>
                           </Col>
                           <Col md="10">
                           </Col>
                        </Row>
                     </Form>
                     <Row className="tablerow">
                        <Col md="12">
                           <Row className='margin-less'>
                              <Col md="10"></Col>
                              <Col md="2">
                                 <Button color="danger" className="expcatregisterbtn" onClick={toggle}><IoIosAddCircleOutline className='icondesigncolor' /></Button>
                                 <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                                    <ModalHeader toggle={toggle}>
                                       <h1 className='headingdesigncategory'>経費カテゴリの登録</h1>
                                    </ModalHeader>
                                    <ModalBody>
                                       <div className='expensecatregmaindiv'>
                                          <Container>
                                             <Form onSubmit={handleForm} className="catregisterform">
                                                <Row>
                                                   <Col md="12">
                                                      <FormGroup>
                                                         <label>カテゴリー名</label><br />
                                                         <Input type="text" id="expense_category_name" name="expense_category_name" value={category.expense_category_name} onChange={onUpdateField} className="inputdesign" />
                                                         {errors.expense_category_name.dirty && errors.expense_category_name.error ? (<span style={{ color: "red" }}>{errors.expense_category_name.message}</span>) : null}
                                                       </FormGroup>
                                                   </Col>
                                                </Row>

                                                <Row className='marregtop'>
                                                   <Col md="3">
                                                      <Button type="submit" className="registerbtn">登録</Button>
                                                   </Col>
                                                   <Col md="6">
                                                   </Col>
                                                   <Col md="3">
                                                      <Button onClick={toggle} className="deletebtn">キャンセル</Button>
                                                   </Col>
                                                </Row>

                                             </Form>
                                          </Container>
                                       </div>
                                    </ModalBody>
                                 </Modal>
                              </Col>
                           </Row>
                           <Row className='margin-less'>
                              <Col md="12">
                                 <ExpenseCategories expensecategories={currentRecords} />
                                 <Pagination
                                    nPages={nPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                 />
                              </Col>
                           </Row>
                        </Col>

                     </Row>
                  </Container>
               </div>
            </div>
         </div>
      </div>
   )
}
export default ExpenseCategoryList;