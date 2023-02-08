import React, { useEffect, useState } from "react";
import { Form, FormGroup, Container, Input, Row, Col, Label, Button } from "reactstrap";
import axios from "axios";
import base_url from "../../api/bootapi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import { useLoginFormValidators } from "./hooks/useLoginFormValidators";
import clsx from "clsx";
import styles from './login.css';
const LoginUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Login || Expense Management System"
    })
    const [loginData, setLoginData] = useState({});
    const { errors, validateForm } = useLoginFormValidators(loginData);
    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...loginData,
            [field]: e.target.value,
        };
        setLoginData(nextFormState);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Button is clicked");
        console.log(loginData);
        const { isValid } = validateForm({ loginData, errors, forceTouchErrors: true });
        if (!isValid) return;
        alert(JSON.stringify(loginData, null, 2));
        await dispatch(login(loginData));
        postDataToServer(loginData)
    }
    const postDataToServer = (data) => {
        axios.post(`${base_url}/api/auth/signin`, data).then(
            (response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log(response.data);
                    setLoginData(response.data);
                    navigate("/home");
                    sessionStorage.setItem("loginID", JSON.stringify(loginData));
                }
            },
            (error) => {
                console.log(error);
                alert("社員番号とパスワードが一致しません");
            }
        )
    }
    return (
        <div className="mainlogindiv">
            <Container>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Form onSubmit={handleSubmit} className="mainlogindivform">
                            <Row>
                                <Col md="12">
                                    <h1 className="heading-title">NU-systems corporation</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <p className="paradesign">セッションを続けるにはログインしてください！</p>
                                </Col>
                            </Row>
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
                                        value={loginData.staffNumber}
                                        onChange={onUpdateField}
                                     />
                                    {errors.staffNumber.dirty && errors.staffNumber.error ? (
                                    <p className="formFieldErrorMessage">
                                       {errors.staffNumber.message}
                                    </p>
                                    ) : null}
                            </FormGroup>
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
                                        aria-label="password field"
                                        name="password"
                                        value={loginData.password}
                                        onChange={onUpdateField}
                                     />
                                    {errors.password.dirty && errors.password.error ? (
                                    <p className="formFieldErrorMessage">
                                       {errors.password.message}
                                    </p>
                                    ) : null}
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" className="loginbtn">ログイン</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md="3"></Col>
                </Row>
            </Container>
        </div>
    )
}
export default LoginUp;