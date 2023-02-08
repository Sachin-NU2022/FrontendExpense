import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, FormGroup, Button, Container, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import "./departmentList.css";
import { useFormValidDept } from "./departmentvalidator";
import { FaEdit } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Department = ({ department: { department_id, department_name, auth_user_edit, auth_expense_category, auth_payment_edit, del_flg } }) => {
    // Modal open state
    const [modal, setModal] = React.useState(false);
    // Toggle for Modal
    const toggle = () => {
        loadDepartmentList();
        setModal(!modal);
    }
    let navigate = useNavigate();
    const reload=()=>window.location.reload();
    useEffect(() => {
        document.title = "Update Department || Expense management System"
    }, []);

    const [department, setDepartment] = useState({});
    const { errors, validationForm } = useFormValidDept(department);
    const loadDepartmentList = () => {
        axios.get(`${base_url}/api/department/search/${department_id}`).then(
            (response) => {
                console.log(response.data);
                setDepartment(response.data);
            }, (error) => {
                console.log(error);
            }
        )
    }

    const onUpdateField = (e) => {
        const field = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const nextFormState = {
            ...department,
            [field]: value
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
    
    // creating function to postdata on server
    const postDatatoServer = (data) => {
        axios.put(`${base_url}/api/department/update/${department_id}`, data).then(
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
        axios.put(`${base_url}/api/department/delete/${data.department_id}`, data).then(
            (response) => {
                console.log("department deleted successfully");
                setModal(!modal);
                reload();
                
            },(error) => {
                console.log(error);
            }
        )
    }
    return (
        <tr key={department_id}>
            {
                del_flg ? 
                <td style={{background : "#FA8072", color : "#212666"}} >
                    {department_id}
                </td> : 
                <td style={{background : "#f5f5f5"}}>
                    {department_id}
                </td>
            }
            <td>{department_name}</td>
            <td>
                <Container>
                    <Row>
                        <Col md="12">
                            <Button className='editbtn' onClick={toggle}><FaEdit className='editicon' /></Button>
                            <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                                <ModalHeader toggle={toggle}>
                                    <h1 className='departheadingupdate text-center'>部門の更新</h1>
                                </ModalHeader>
                                <ModalBody>
                                    <Container className='container'>
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
                                                            <Input type="text" id="department_name" name="department_name" defaultValue={department_name} onChange={onUpdateField} className="departinputdesign" />
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
                                                            <Input type="checkbox" name="auth_user_edit" defaultChecked={auth_user_edit} defaultValue={auth_user_edit} id="auth_user_edit" onChange={onUpdateField} />{" "}
                                                            ユーザー編集権限
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="2" />
                                                    <Col md="10">
                                                        <FormGroup>
                                                            <Input type="checkbox" name="auth_expense_category" defaultChecked={auth_expense_category} defaultValue={auth_expense_category} id="auth_expense_category" onChange={onUpdateField} />{" "}
                                                            勘定科目編集権限
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="my-2">
                                                    <Col md="2" />
                                                    <Col md="10">
                                                        <FormGroup>
                                                            <Input type="checkbox" name="auth_payment_edit" defaultChecked={auth_payment_edit} defaultValue={auth_payment_edit} id="auth_payment_edit" onChange={onUpdateField} />{" "}
                                                            支払編集権限
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
                                                           <Button onClick={() => {submit(department)}} className="deletebtn">復元</Button> 
                                                        </Col> : 
                                                        <Col md="2">
                                                           <Button onClick={() => {submit(department)}} className="deletebtn">削除</Button> 
                                                        </Col>
                                                    }
                                                   
                                                </Row>
                                            </Container>
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
export default Department;