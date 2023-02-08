import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, FormGroup, Button, Container, Row, Col, Label } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import "./departmentList.css";
import Navbar from '../navbar/Navbar.component';
import Sidebar from '../sidebar/sidebar.component';
import { useFormValidDept } from "./departmentvalidator";
const EditDepartmentList = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        document.title = "Update Department || Expense management System"
    }, []);

    const [department, setDepartment] = useState({});
    const { errors, validationForm, onBlurField } = useFormValidDept(department);
    const loadDepartmentList = () => {
        axios.get(`${base_url}/api/department/search/${id}`).then(
            (response) => {
                console.log(response.data);
                setDepartment(response.data);
            }, (error) => {
                console.log(error);
            }
        )
    }
    useEffect(() => {
        loadDepartmentList();
    }, [])

    const onUpdateField = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...department,
            [field]: e.target.value
        };
        setDepartment(nextFormState);
        if (errors[field].dirty)
            validationForm({
                department: nextFormState,
                errors,
                field,
            })
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
        axios.put(`${base_url}/api/department/update/${id}`, data).then(
            (response) => {
                console.log(response);
                navigate("/departlist");
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
                    <div className='employeeregmaindiv'>
                        <Container className='container'>
                            <h1 className='departheadingupdate text-center'>部門の更新</h1>
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
                                                <Input type="text" id="department_name" name="department_name" defaultValue={department.department_name} onChange={onUpdateField} onBlur={onBlurField} className="departinputdesign" />
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
                                                <Input type="checkbox" name="auth_user_edit" id="auth_user_edit" onChange={(e) => { }} />{" "}
                                                ユーザー編集権限
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="2" />
                                        <Col md="10">
                                            <FormGroup>
                                                <Input type="checkbox" name="auth_expense_category" id="auth_expense_category" />{" "}
                                                勘定科目編集権限
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="my-2">
                                        <Col md="2" />
                                        <Col md="10">
                                            <FormGroup>
                                                <Input type="checkbox" name="auth_payment_edit" id="auth_payment_edit" />{" "}
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
                                        <Col md="2">
                                            <Button onClick={() => navigate(-1)} className="deletebtn">キャンセル</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>

                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDepartmentList;