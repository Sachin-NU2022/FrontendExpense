import React, { useEffect, useState } from 'react';
import { FormGroup, Input, Button, Container, Row, Col, Label } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import base_url from '../../api/bootapi';
import Employees from "./employees.component";
import './employeeList.css';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Pagination from "./pagination.component";
import Navbar from '../../Component/navbar/Navbar.component';
import Sidebar from '../../Component/sidebar/sidebar.component';
import clsx from "clsx";
import { useEmployeeFormValidators } from "./hooks/useEmployeeFormValidators";
import styles from './employeeList.css';
import {useNavigate} from "react-router-dom";

const EmployeeList = () => {
    let navigate =  useNavigate();
    const [employee, setEmployee] = useState({});
    const { errors, validateForm } = useEmployeeFormValidators(employee);
    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...employee,
            [field]: e.target.value,
        };
        setEmployee(nextFormState);
    };
    const reload=()=>window.location.reload();
    
    const handleChange = e => {
        e.preventDefault();
        const { isValid } = validateForm({ employee, errors, forceTouchErrors: true });
        if (!isValid) return;
        alert(JSON.stringify(employee, null, 2));
        postDatatoServer(employee);
        e.target.reset();
    };

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

    // creating function to postdata on server
    const postDatatoServer = (data) => {
        axios.post(`${base_url}/api/auth/signup`, data).then(
            (response) => {
                console.log(response);
                navigate("/emplist");
                toggle();
                reload();
            }, (error) => {
                console.log(error);
            }
        )
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    // Modal open state
    const [modal, setModal] = React.useState(false);

    // Toggle for Modal
    const toggle = () => setModal(!modal);


    useEffect(() => {
        document.title = "Employee List || Expense Management System";
    }, []);
     
    // getting login Id from session storage
    let fetchData = sessionStorage.getItem("loginID");
    let userData = JSON.parse(fetchData);
    // Function to calling server
    const getEmployeeListFromServer = () => {
        axios.get(`${base_url}/api/auth/search`).then(
            (response) => {
                console.log(response.data);
                let result = response.data;
                let filteredData = result.filter(result => result.staffNumber !== userData.staffNumber)
                setEmployees(filteredData);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getEmployeeListFromServer();
        fetchOptionData();
        fetchOptionDiv();
    }, [])

    
   const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.username.value;
    const query1 = document.getElementById('department').value;
    const query2 = document.getElementById('division').value;
    getSearchEmployeeListFromServer(query);
    //getSearchEmployeeListByDepartNameFromServer(query1,query2);
    e.target.reset();
   }
     
   const getSearchEmployeeListFromServer = (data) => {
    axios.get(`${base_url}/api/auth/kensaku?query=${data}`).then(
       (response) => {
          setCurrentPage(1);
          let result = response.data;
          let filteredData = result.filter(result => result.staffNumber !== userData.staffNumber)
          setEmployees(filteredData);
       },
       (error) => {
          console.log(error);
       }
    )
    }

    const getSearchEmployeeListByDepartNameFromServer = (data1, data2) => {
            axios.post(`${base_url}/api/auth/fetch?query1=${data1}&query2=${data2}`).then(
                (response) => {
                    console.log(data1);
                    console.log(data2);
                    console.log(response.data)
                   setCurrentPage(1);
                //    let result = response.data;
                //    let filteredData = result.filter(result => result.staffNumber !== userData.staffNumber)
                   setEmployees(response.data);
                   console.log();
                },
                (error) => {
                   console.log(error);
                }
             )
    }

    const [employees, setEmployees] = useState([]);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(employees.length / recordsPerPage)

    return (
        <div className='home'>
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className='bodydesign'>
                    <div className="employeelistmaindiv">
                        <Container>
                            <Form onSubmit={handleSearch} className="employeelistmainform">
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>氏名</Label>
                                            <Input type="text" id="fullname" className="listinputdesign"  name="username" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>所属部署</Label>
                                            <select aria-label="Default select example" id="department" className="form-control listinputdesign" name="department_name" >
                                                {optionList.map((item) => (
                                                    <option key={item.department_id} value={item.department_name}>
                                                         {item.department_name}
                                                    </option>
                                                 ))}
                                            </select>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>所属課</Label>
                                            <select aria-label="Default select example" id="division" className="form-control listinputdesign" name="division_name" >
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
                                    <Row className="margin-less">
                                        <Col md="10"></Col>
                                        <Col md="2">
                                            <Button color="danger" className="empregisterbtn" onClick={toggle}><IoIosAddCircleOutline className="icondesigncolor" /></Button>
                                            <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                                                <ModalHeader toggle={toggle}>
                                                    <h1 className='headingemployeedesign'>社員登録</h1>
                                                </ModalHeader>
                                                <ModalBody>

                                                    <div>
                                                        <div className='employeeregmaindiv'>
                                                            <Container>
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
                                                                                    aria-label="staffNumber field"
                                                                                    name="staffNumber"
                                                                                    value={employee.staffNumber}
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
                                                                                <Label>パスワード</Label>
                                                                                <input
                                                                                    className={clsx(
                                                                                        styles.formField,
                                                                                        errors.password.dirty &&
                                                                                        errors.password.error &&
                                                                                        styles.formFieldError
                                                                                    )}
                                                                                    type="password"
                                                                                    aria-label="Password field"
                                                                                    name="password"
                                                                                    value={employee.password}
                                                                                    onChange={onUpdateField}
                                                                                />
                                                                                {errors.password.dirty && errors.password.error ? (
                                                                                    <p className="formFieldErrorMessage">
                                                                                        {errors.password.message}
                                                                                    </p>
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
                                                                                    value={employee.username}
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
                                                                                    value={employee.staff_kana}
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
                                                                                <select aria-label="Default select example" onChange={(e) => { setEmployee({ ...employee, department_name: e.target.value }) }} className="form-control registerinputdesign">
                                                                                    {optionList.map((item) => (
                                                                                    <option key={item.department_id} value={item.department_name}>
                                                                                        {item.department_name}
                                                                                    </option>
                                                                                    ))}
                                                                                </select>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col md="6">
                                                                            <FormGroup>
                                                                                <Label>所属課</Label>
                                                                                  <select aria-label="Default select example" onChange={(e) => { setEmployee({ ...employee, division_name: e.target.value }) }} className="form-control registerinputdesign">
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
                                                                                <Label>メールアドレス</Label>
                                                                                <input
                                                                                    className={clsx(
                                                                                        styles.formField,
                                                                                        errors.email.dirty && errors.email.error && styles.formFieldError
                                                                                    )}
                                                                                    type="text"
                                                                                    aria-label="Email field"
                                                                                    name="email"
                                                                                    value={employee.email}
                                                                                    onChange={onUpdateField}
                                                                                />
                                                                                {errors.email.dirty && errors.email.error ? (
                                                                                    <p className="formFieldErrorMessage">{errors.email.message}</p>
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
                                    </Row>
                                    <Row className="margin-less">
                                        <Col md="12">
                                            <Employees employees={currentRecords} />
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
export default EmployeeList;