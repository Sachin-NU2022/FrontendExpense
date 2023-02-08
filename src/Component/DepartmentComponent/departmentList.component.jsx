import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Button, Container, Row, Col, Label } from 'reactstrap';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../Employee/pagination.component";
import axios from "axios";
import base_url from "../../api/bootapi";
import Sidebar from "../sidebar/sidebar.component";
import Navbar from "../navbar/Navbar.component";
import { useFormValidDept } from "./departmentvalidator";
import Departments from "./departments.component";
import './departmentList.css';


const DepartmentList = () => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    // Modal open state
    const [modal, setModal] = React.useState(false);
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    const reload=()=>window.location.reload();
    // Function to calling server
    const getDepartmentListFromServer = () => {
        axios.get(`${base_url}/api/department/search`).then(
            (response) => {
                console.log(response.data);
                setDepartments(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getDepartmentListFromServer();
    }, [])


    const handleSearch = (e) => {
        e.preventDefault();
        const departname = e.target.elements.department_name.value;
        getSearchExpenseCatListFromServer(departname);
        e.target.reset();
    }

    const getSearchExpenseCatListFromServer = (searchdata) => {
        axios.get(`${base_url}/api/department/kensaku?query=${searchdata}`).then(
            (response) => {
                console.log(response.data);
                setCurrentPage(1);
                setDepartments(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const [departments, setDepartments] = useState([]);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = departments.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(departments.length / recordsPerPage)


    const [department, setDepartment] = useState({});
    const { errors, validationForm} = useFormValidDept(department);
    const onUpdateField = (e) => {
        const field = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const nextFormState = {
            ...department, [field]: value
        };
        setDepartment(nextFormState);
    }
    const handleForm = (e) => {
        e.preventDefault();
        const { isValid } = validationForm({ department, errors, forceTouchErrors: true });
        if (!isValid) return;
        alert(JSON.stringify(department, null, 2));
        console.log(department);
        postDatatoServer(department);
        e.target.reset();
    }
    const postDatatoServer = (data) => {
        axios.post(`${base_url}/api/department/register`, data).then(
            (response) => {
                console.log(response);
                toggle();
                navigate("/departlist");
                reload();
            },
            (error) => {
                console.log(error)
            }
        )
    }
    useEffect(() => {
        document.title = "Department List || Expense management system"
    }, [])

    return (
        <div className='home'>
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className='bodydesign'>
                    <div className='departmentlistmaindiv'>
                        <Container>
                            <Form onSubmit={handleSearch} className="departmentlistmainform">
                                <Row>
                                    <Col md="12" className="searchinnerbody">
                                        <Label>部署名</Label>
                                        <Input type="search" id="" name="department_name" placeholder="Search Department" className='departmentlistinputdesign' />
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
                                                    <h1 className='headingtitledesign'>部門の登録</h1>
                                                </ModalHeader>
                                                <ModalBody>

                                                    <Form onSubmit={handleForm} >
                                                        <Container>
                                                            <Row className="my-3">
                                                                <Col md="2">
                                                                    <FormGroup>
                                                                        <Label>部署名</Label>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="10">
                                                                    <FormGroup>
                                                                        <Input type="text" id="department_name" name="department_name" value={department.department_name} onChange={onUpdateField} className="departinputdesign" />
                                                                        {errors.department_name.dirty && errors.department_name.error ? (<span style={{ color: "red" }}>{errors.department_name.message}</span>) : null}
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="2">
                                                                    <FormGroup>
                                                                        <Label>
                                                                            アクセス
                                                                        </Label>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="10">
                                                                    <FormGroup>
                                                                        <Input type="checkbox" name="auth_user_edit" id="auth_user_edit" onChange={onUpdateField} />{" "}
                                                                        ユーザー編集権限
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="2" />
                                                                <Col md="10">
                                                                    <FormGroup>
                                                                        <Input type="checkbox" name="auth_expense_category" id="auth_expense_category" onChange={onUpdateField} />{" "}
                                                                        勘定科目編集権限
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className="my-2">
                                                                <Col md="2" />
                                                                <Col md="10">
                                                                    <FormGroup>
                                                                        <Input type="checkbox" name="auth_payment_edit" id="auth_payment_edit" onChange={onUpdateField} />{" "}
                                                                        支払編集権限
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className="margindepartmenttop">
                                                                <Col md="3">
                                                                    <Button type="submit" className="registerbtn">登録</Button>
                                                                </Col>
                                                                <Col md="6">
                                                                </Col>
                                                                <Col md="3">
                                                                    <Button onClick={toggle} className="deletebtn">キャンセル</Button>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Form>

                                                </ModalBody>

                                            </Modal>
                                        </Col>
                                    </Row>
                                    <Row className='margin-less'>
                                        <Col md="12">
                                            <Departments departments={currentRecords} />
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

export default DepartmentList;