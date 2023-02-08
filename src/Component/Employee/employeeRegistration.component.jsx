import React, { useEffect, useState } from 'react';
import { FormGroup, Button, Container, Row, Col, Label } from 'reactstrap';
import clsx from "clsx";
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import styles from './employeeRegistration.css';
import { useEmployeeFormValidators } from "./hooks/useEmployeeFormValidators";


const EmployeeRegistration = (props) => {
     useEffect(() => {
          document.title = "Register Employee || Expense management System"
     }, []);

     const [employee, setEmployee] = useState({});
     const { errors, validateForm, onBlurField } = useEmployeeFormValidators(employee);
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
          axios.post(`${base_url}/api/employee/register`, data).then(
               (response) => {
                    console.log(response);
               }, (error) => {
                    console.log(error);
               }
          )
     }
     return (
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
                                                       errors.staff_id.dirty &&
                                                       errors.staff_id.error &&
                                                       styles.formFieldError
                                                  )}
                                                  type="number"
                                                  aria-label="ID field"
                                                  name="staff_id"
                                                  value={employee.staff_id}
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
                                                  value={employee.staff_pswd}
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
                                                  value={employee.staff_name}
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
                                                  value={employee.staff_kana}
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
                                             <select aria-label="Default select example" onChange={(e) => { setEmployee({ ...employee, department_id: e.target.value }) }} className="form-control registerinputdesign" required>
                                                  <option selected value="1">System Department</option>
                                                  <option value="2">Finance Department</option>
                                                  <option value="3">Development Department</option>
                                             </select>
                                        </FormGroup>
                                   </Col>
                                   <Col md="6">
                                        <FormGroup>
                                             <Label>所属課</Label>
                                             <select aria-label="Default select example" onChange={(e) => { setEmployee({ ...employee, division_id: e.target.value }) }} className="form-control registerinputdesign" required>
                                                  <option value="1">System Development</option>
                                                  <option value="2">System Support</option>
                                                  <option value="3">Custom Support</option>
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
                                                       errors.staff_email.dirty && errors.staff_email.error && styles.formFieldError
                                                  )}
                                                  type="text"
                                                  aria-label="Email field"
                                                  name="staff_email"
                                                  value={employee.staff_email}
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
                                   <Col md="3">
                                        <Button type="submit" className="registerbtn">登録</Button>
                                   </Col>
                                   <Col md="6">
                                   </Col>
                                   <Col md="3">
                                        <Button type="submit" className="deletebtn">キャンセル</Button>
                                   </Col>
                              </Row>
                         </Form>
                    </Container>
               </div>
          </div>
     )
}
export default EmployeeRegistration;