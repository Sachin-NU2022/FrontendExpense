import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormGroup, Button, Container, Row, Col, Label } from 'reactstrap';
import clsx from "clsx";
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import styles from './employeeRegistration.css';
import Navbar from '../../Component/navbar/Navbar.component';
import Sidebar from '../../Component/sidebar/sidebar.component';
import { useEmployeeFormValidators } from "./hooks/useEmployeeFormValidators";
const EditEmployeeList = () => {
        let navigate = useNavigate();
        const { id } = useParams();
        
        useEffect(() => {
                document.title = "Update Employee || Expense management System"
        }, []);
        const [employee, setEmployee] = useState({});
        const { errors, validateForm, onBlurField } = useEmployeeFormValidators(employee);
        const loadEmployeeList = () => {
                axios.get(`${base_url}/api/employee/search/${id}`).then(
                       (response) => {
                               console.log(response.data);
                               setEmployee(response.data);
                       }, (error) => {
                               console.log(error);
                       }
                )
        }
        useEffect(() => {
           loadEmployeeList();
        },[])
        const onUpdateField = e => {
                const field = e.target.name;
                const nextFormState = {
                        ...employee,
                        [field]: e.target.value,
                };
                setEmployee(nextFormState);
                if (errors[field].dirty)
                        validateForm({
                                employee: nextFormState,
                                errors,
                                field,
                        });
        };
        const handleChange = e => {
                e.preventDefault();
                const { isValid } = validateForm({ employee, errors, forceTouchErrors: true });
                if (!isValid) return;
                alert(JSON.stringify(employee, null, 2));
                postDatatoServer(employee);
                e.target.reset();
        };
         // creating function to postdata on server
         const postDatatoServer = (data) => {
                axios.put(`${base_url}/api/employee/update/${id}`, data).then(
                        (response) => {
                                console.log(response);
                                navigate("/emplist");
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
                                        <h1 className='heading-titlee'>従業員の更新</h1>
                                        <Form onSubmit={handleChange} className="registerform">
                                                <Row>
                                                        <Col md="6">
                                                                <FormGroup>
                                                                        <Label>社員番号</Label>
                                                                        <input
                                                                                className={clsx(
                                                                                        styles.formField,
                                                                                        errors.staff_id.dirty &&
                                                                                        errors.staff_id.error &&
                                                                                        styles.formFieldError
                                                                                )}
                                                                                type="number"
                                                                                aria-label="ID field"
                                                                                name="staff_id"
                                                                                defaultValue={employee.staff_id}
                                                                                onChange={onUpdateField}
                                                                                onBlur={onBlurField}
                                                                        />
                                                                        {errors.staff_id.dirty && errors.staff_id.error ? (
                                                                                <p className="formFieldErrorMessage">
                                                                                        {errors.staff_id.message}
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
                                                                                        errors.staff_pswd.dirty &&
                                                                                        errors.staff_pswd.error &&
                                                                                        styles.formFieldError
                                                                                )}
                                                                                type="password"
                                                                                aria-label="Password field"
                                                                                name="staff_pswd"
                                                                                defaultValue={employee.staff_pswd}
                                                                                onChange={onUpdateField}
                                                                                onBlur={onBlurField}
                                                                        />
                                                                        {errors.staff_pswd.dirty && errors.staff_pswd.error ? (
                                                                                <p className="formFieldErrorMessage">
                                                                                        {errors.staff_pswd.message}
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
                                                                                        errors.staff_name.dirty && errors.staff_name.error && styles.formFieldError
                                                                                )}
                                                                                type="text"
                                                                                aria-label="name field"
                                                                                name="staff_name"
                                                                                defaultValue={employee.staff_name}
                                                                                onChange={onUpdateField}
                                                                                onBlur={onBlurField}
                                                                        />
                                                                        {errors.staff_name.dirty && errors.staff_name.error ? (
                                                                                <p className="formFieldErrorMessage">
                                                                                        {errors.staff_name.message}
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
                                                                                defaultValue={employee.staff_kana}
                                                                                onChange={onUpdateField}
                                                                                onBlur={onBlurField}
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
                                                                        <Form.Select aria-label="Default select example" defaultValue={employee.department_id} onChange={(e) => { setEmployee({ ...employee, department_id: e.target.value }) }} className="registerinputdesign" required>
                                                                                <option value="1">System Department</option>
                                                                                <option value="2">Finance Department</option>
                                                                                <option value="3">Development Department</option>
                                                                        </Form.Select>
                                                                </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                                <FormGroup>
                                                                        <Label>所属課</Label>
                                                                        <Form.Select aria-label="Default select example" defaultValue={employee.division_id} onChange={(e) => { setEmployee({ ...employee, division_id: e.target.value }) }} className="registerinputdesign" required>
                                                                                <option value="1">System Development</option>
                                                                                <option value="2">System Support</option>
                                                                                <option value="3">Custom Support</option>
                                                                        </Form.Select>
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
                                                                                        errors.staff_email.dirty && errors.staff_email.error && styles.formFieldError
                                                                                )}
                                                                                type="text"
                                                                                aria-label="Email field"
                                                                                name="staff_email"
                                                                                defaultValue={employee.staff_email}
                                                                                onChange={onUpdateField}
                                                                                onBlur={onBlurField}
                                                                                reqired
                                                                        />
                                                                        {errors.staff_email.dirty && errors.staff_email.error ? (
                                                                                <p className="formFieldErrorMessage">{errors.staff_email.message}</p>
                                                                        ) : null}
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
                                        </Form>
                                </Container>
                        </div>
                </div>
                </div>
                </div>
        )
}

export default EditEmployeeList;