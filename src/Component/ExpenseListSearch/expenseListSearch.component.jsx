import React, { useEffect, useState } from "react";
import { Form} from 'react-bootstrap';
import { FormGroup, Input, Button, Container, Row, Col, Label} from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import base_url from "../../api/bootapi";
import axios from "axios";
import Sidebar from "../sidebar/sidebar.component";
import Navbar from "../navbar/Navbar.component";
import Pagination from "../Employee/pagination.component";
import { useExpenseFormValidators } from "./hooks/useExpenseFormValidators";
import ExpenseLists from "./expenselists.component";
import clsx from "clsx";
import styles from './expenseListSearch.css';

const ExpenseListSearch = () => {
    useEffect(() => {
        document.title = "Expense search list || Expense management system"
    })
    useEffect(() => {
        document.title = "ExpenseList || Expense mangement system"
   }, [])

   // Modal open state
   const [modal, setModal] = React.useState(false);

   // Toggle for Modal
   const toggle = () => setModal(!modal);
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

    const [expense, setExpense] = useState({});
    const { errors, validateForm} = useExpenseFormValidators(expense);
    const onUpdateField = e => {
       const field = e.target.name;
       const nextFormState = {
           ...expense,
           [field]: e.target.value,
       };
       setExpense(nextFormState);
    };
    
    const handleForm = (e) => {
    e.preventDefault();
    // Getting data from the session storage
    let fetchData = sessionStorage.getItem("loginID");
    let userData = JSON.parse(fetchData);
    console.log(userData.staffNumber);
    console.log(expense);
    const { isValid } = validateForm({ expense, errors, forceTouchErrors: true });
    if (!isValid) return;
    alert(JSON.stringify(expense, null, 2));
    postDatatoServer(expense, userData);
    e.target.reset();
    }

    let fetchData = sessionStorage.getItem("loginID");
    let userData = JSON.parse(fetchData);

    const postDatatoServer = (data, userData) => {
         axios.post(`${base_url}/api/expense/register/${userData.staffNumber}`, data).then(
                 (response) => {
                     console.log(response);
                     toggle();
                     reload();
                 }, (error) => {
                     console.log(error);
                 }
    )}

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    // Function to calling server
    const getExpenseListFromServer = () => {
       axios.get(`${base_url}/api/expense/search`).then(
           (response) => {
             
               let result = response.data;
               let filteredResult = result.filter(result => result.staff_id.includes(userData.staffNumber));
               console.log(filteredResult);
               {
                 userData.staffNumber === "1" ?  setExpenses(response.data) : setExpenses(filteredResult)
                 setCurrentPage(1);
               }
           },
           (error) => {
               console.log(error);
           }
       )
    }

    useEffect(() => {
       getExpenseListFromServer();
       fetchOptionData();
       fetchOptionDiv();
    }, [])

   const handleSearch = (e) => {
    e.preventDefault();
    const empname = e.target.elements.username.value;
    const empnumber = e.target.elements.staffnumber.value;
    let approvedValue = document.getElementById('approvalValue').value;
    const query1 = document.querySelector('#app1').value;
    const query2 = document.querySelector('#app2').value;
    const query3 = document.querySelector('#app3').value;
    const query4 = document.querySelector('#app4').value;
    const query5 = document.querySelector('#app5').value;
    const query6 = document.querySelector('#app6').value;
    getSearchExpenseListFromServer(query1, query2, query3, query4, query5, query6);
    getSearchExpenseListByNameFromServer(empname, empnumber);
    getSearchExpenseListByStatusFromServer(approvedValue, empname, empnumber, query1, query2, query3, query4, query5, query6);
    e.target.reset();
   }

   const getSearchExpenseListFromServer = (date1, date2, date3, date4, date5, date6) => {
    axios.get(`${base_url}/api/expense/kensaku?query=${date1}&query1=${date2}&query2=${date3}&query3=${date4}&query4=${date5}&query5=${date6}`).then(
       (response) => {
          console.log(response.data);
          let result = response.data;
          let filteredResult = result.filter(result => result.staff_id.includes(userData.staffNumber));
          console.log(filteredResult);
          {
            userData.staffNumber === "1" ? setExpenses(response.data) : setExpenses(filteredResult)
            setCurrentPage(1);
          }
       },
       (error) => {
          console.log(error);
       }
    )
    }

    const getSearchExpenseListByNameFromServer = (empname,empnumber) => {
        axios.post(`${base_url}/api/expense/fetch?query6=${empname}&query7=${empnumber}`).then(
           (response) => {
              console.log(response.data);
              let result = response.data;
              let filteredResult = result.filter(result => result.staff_id.includes(userData.staffNumber));
              console.log(filteredResult);
              {
                userData.staffNumber === "1" ? setExpenses(response.data) : setExpenses(filteredResult)
                setCurrentPage(1);
              }
           },
           (error) => {
              console.log(error);
           }
        )
     }

     const getSearchExpenseListByStatusFromServer = (approvedValue, empname, empnumber, query1, query2, query3, query4, query5, query6) => {
        if(!empname && !empnumber && !query1 && !query2  && !query3 && !query4  && !query5 && !query6){
              axios.post(`${base_url}/api/expense/fetching?query8=${approvedValue}`).then(
                (response) => {
                  console.log(approvedValue)
                   console.log(response.data);
                   let result = response.data;
                   let filteredResult = result.filter(result => result.staff_id.includes(userData.staffNumber));
                   console.log(filteredResult);
                   {
                     userData.staffNumber === "1" ? setExpenses(response.data) : setExpenses(filteredResult)
                     setCurrentPage(1);
                   }
                },
                (error) => {
                   console.log(error);
                }
             )
        }
   }

   const [expenses, setExpenses] = useState([]);
   const indexOfLastRecord = currentPage * recordsPerPage;
   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
   const currentRecords = expenses.slice(indexOfFirstRecord, indexOfLastRecord);
   const nPages = Math.ceil(expenses.length / recordsPerPage)
   
   return (
        <div className='home'>
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className='bodydesign'>
                    <div className="expenselistmaindiv">
                        <Container>
                            <Form onSubmit={handleSearch} className="expenselistmainform">
                                <Row>
                                    <Col md="2">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>社員番号</Form.Label>
                                        <Form.Control type='number' name="staffnumber"  className="formdesigninput" />
                                    </Form.Group>
                                    </Col>
                                    <Col md="3">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>氏名</Form.Label>
                                         <Form.Control type='text' name="username" className="formdesigninput" />
                                    </Form.Group>
                                    </Col>
                                    <Col md="3">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>申請日 From</Form.Label>
                                        <Form.Control type='date' className="formdesigninput" id="app1" />
                                    </Form.Group>
                                    </Col>
                                    <Col md="1">
                                        <h3 className="breakdesign">~</h3>
                                    </Col>
                                    <Col md="3">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>申請日 To</Form.Label>
                                        <Form.Control type='date' className="formdesigninput" id="app2" />
                                    </Form.Group> 
                                    </Col>
                                </Row>
                                <Row>
                                     <Col md="2">
                                     <Form.Group className='mb-3'>
                                        <Form.Label>決裁月 From</Form.Label>
                                        <Form.Control type='date' className="formdesigninput" id="app3" />
                                     </Form.Group>
                                     </Col>
                                     <Col md="1">
                                        <h3 className="breakdesign">~</h3>
                                     </Col>
                                     <Col md="2">
                                     <Form.Group className='mb-3'>
                                        <Form.Label>決裁月 To</Form.Label>
                                        <Form.Control type='date' className="formdesigninput" id="app4" />
                                     </Form.Group>
                                     </Col>
                                     <Col md="2">
                                     <Form.Group className='mb-3'>
                                        <Form.Label>支払日 From</Form.Label>
                                        <Form.Control type='date' className="formdesigninput" id="app5" />
                                    </Form.Group>
                                     </Col>
                                     <Col md="1">
                                        <h3 className="breakdesign">~</h3>
                                     </Col>
                                     <Col md="2">
                                     <Form.Group className='mb-3'>
                                        <Form.Label>支払日 To</Form.Label>
                                        <Form.Control type='date' className="formdesigninput" id="app6"/>
                                     </Form.Group>
                                     </Col>
                                     <Col md="2">
                                        <FormGroup>
                                            <Label>決裁状態</Label>
                                            <select id="approvalValue" name="approvalValue" className="form-control listinputdesign" aria-required="true">
                                                <option value="1">承認済み</option>
                                                <option value="0">保留中</option>
                                            </select>
                                        </FormGroup>
                                     </Col>
                                </Row>
                                <Row className="margintoprow">
                                    <Col md="2">
                                        <Row>
                                            <Col md="6">
                                                <Button type="submit" className="searchbtn">検索</Button>
                                            </Col>
                                            <Col md="6">
                                                <Button type="submit" className="clearbtn">クリア</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="10">
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="tablerow">
                                <Col md="12">
                                    {
                                       userData.staffNumber !== "1" ?
                                       <Row className="margin-less">
                                        <Col md="10"></Col>
                                        <Col md="2">
                                        <Button color="danger" className="empregisterbtn" onClick={toggle}><IoIosAddCircleOutline className="icondesigncolor" /></Button>
                                            <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                                                <ModalHeader toggle={toggle}>
                                                    <h1 className='headingexpensedesign'>経費の登録</h1>
                                                </ModalHeader>
                                                <ModalBody>
                                                    <div>
                                                        <div className='employeeregmaindiv'>
                                                            <Container>
                                                                <Form onSubmit={handleForm}>
                                                                    <Row>
                                                                        <Col md="12">
                                                                            <FormGroup>
                                                                                <Label>所属部署</Label>
                                                                                <select aria-label="Default select example" onChange={(e) => { setExpense({ ...expense, app_depart_id: e.target.value }) }} className="form-control expinputformdesign" required>
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
                                                                                <select aria-label="Default select example" onChange={(e) => { setExpense({ ...expense, app_division_id: e.target.value }) }} className="form-control expinputformdesign" required>
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
                                                                                    value={expense.description}
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
                                                                                    value={expense.payment_destination}
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
                                                                                    value={expense.entraining_point}
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
                                                                                    value={expense.arrival_station}
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
                                                                                    value={expense.amount}
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
                                                                                    value={expense.note}
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
                                                    </div>
                                                </ModalBody>

                                            </Modal>
                                        </Col>
                                       </Row> : ""
                                    }
                                    <Row className="margin-less">
                                        <Col md="12">
                                            <ExpenseLists expenses={currentRecords} />
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

export default ExpenseListSearch;