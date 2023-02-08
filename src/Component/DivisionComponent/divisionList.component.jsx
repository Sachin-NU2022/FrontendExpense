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
import Divisions from "./divisions.component";
import { useFormValidator } from "./inputValidator";
import './divisionList.css';

const DivisionList = () => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    // Modal open state
    const [modal, setModal] = React.useState(false);
    // Toggle for Modal
    const toggle = () => setModal(!modal);
    
    const reload=()=>window.location.reload();

    const [optionList,setOptionList] = useState([]);
  
   
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
    
     
    // Function to calling server
    const getDivisionListFromServer = () => {
        axios.get(`${base_url}/api/division/search`).then(
            (response) => {
                console.log(response.data);
                setDivisions(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getDivisionListFromServer();
        fetchOptionData();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const departname = e.target.elements.division_name.value;
        getSearchDivisionListFromServer(departname);
        e.target.reset();
    }

    const getSearchDivisionListFromServer = (searchdata) => {
        axios.get(`${base_url}/api/division/kensaku?query=${searchdata}`).then(
            (response) => {
                console.log(response.data);
                setCurrentPage(1);
                setDivisions(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const [divisions, setDivisions] = useState([]);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = divisions.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(divisions.length / recordsPerPage)


    const [division, setDivision] = useState("");
    const { errors, validateForm} = useFormValidator(division);
    const onUpdateField = (e) => {
        const field = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const nextFormState = {
            ...division,
            [field] : value
        };
        setDivision(nextFormState);
    }
      
    const handleForm = (e) => {
        e.preventDefault();
        const{isValid} = validateForm({division, errors, forceTouchErrors:true});
        if(!isValid) return;
        alert(JSON.stringify(division, null, 2));
        console.log(division);
        postToServer(division);
        e.target.reset();
    }

    const postToServer = (data) => {
        axios.post(`${base_url}/api/division/register`, data).then(
            (response) => {
                console.log(response);
                toggle();
                reload();
                navigate("/divlist");
            },
            (error) => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        document.title = "Division List || Expense management system"
    }, [])


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
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>課名</Label>
                                            <Input type="search" id="" name="division_name" className='listinputdesign' />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2">
                                        <Row>
                                            <Col md="6">
                                                <Button type="submit" className="searchbtn searchbtnwidth">検索</Button>
                                            </Col>
                                            <Col md="6"> </Col>
                                        </Row>
                                    </Col>
                                    <Col md="10"> </Col>
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
                                                    <h1 className='headingdivisiondesign'>課の登録</h1>
                                                </ModalHeader>
                                                <ModalBody>
                                                    <Form onSubmit={handleForm}>
                                                        <Container >
                                                            <Row>
                                                                <Col md="2">
                                                                    <FormGroup>
                                                                        <Label>所属部署</Label>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="10">
                                                                    <FormGroup >
                                                                        <select aria-label="Default select example" className="form-control registerinputdesign" onChange={(e) => { setDivision({ ...division, department_name: e.target.value }) }} required>
                                                                        {optionList.map((item) => (
                                                                            <option key={item.department_id} value={item.department_name}>
                                                                               {item.department_name}
                                                                            </option>
                                                                        ))}
                                                                        </select>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className="my-3">
                                                                <Col md="2">
                                                                    <FormGroup>
                                                                        <Label>課名</Label>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="10">
                                                                    <FormGroup>
                                                                        <Input type="text" id="division_name" name="division_name" value={division.division_name} onChange={onUpdateField} />
                                                                        {errors.division_name.dirty && errors.division_name.error ? (<span style={{ color: "red" }}>{errors.division_name.message}</span>) : null}
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className="my-2">
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
                                                            <Row className="my-2">
                                                                <Col md="2" />
                                                                <Col md="10">
                                                                    <FormGroup>
                                                                        <Input type="checkbox" name="auth_expense_category" id="auth_expense_category"  onChange={onUpdateField} />{" "}
                                                                        勘定科目編集権限
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className="my-2">
                                                                <Col md="2" />
                                                                <Col md="10">
                                                                    <FormGroup>
                                                                        <Input type="checkbox" name="auth_payment_edit" id="auth_payment_edit"  onChange={onUpdateField} />{" "}
                                                                        支払編集権限
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className="margindivisiontop">
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
                                            <Divisions divisions={currentRecords} />
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
export default DivisionList;