import axios from "axios";
import React, { useEffect, useState} from "react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import base_url from "../../api/bootapi";
import { useFormValidator } from "./inputValidator";

function DivisionUpdate() {
    let navigate = useNavigate();
    const {id} = useParams();

    const [division, setDivision] = useState({});
    const { errors, validateForm, onBlurField } = useFormValidator(division);
    const getSingleListfromServer = () => {
        axios.get(`${base_url}/api/division/search/${id}`).then(
            (response)=> {
                console.log(response.data);
                setDivision(response.data);
            }, 
            (error) =>{
                console.log(error);
            }
        )
    } 
    useEffect(() => {
        getSingleListfromServer();
    },[])
    const onUpdateField = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...division,[field] : e.target.value};
            setDivision(nextFormState);
            if (errors[field].dirty)
                validateForm({
                    division: nextFormState,
                    errors,
                    field,   
                });
        }
    useEffect(() => {
        document.title="DivisionRegistration || NU Expense Management System"
    },[])   
     
  
    const handleForm = (e) => {
        e.preventDefault();
        const{isValid} = validateForm({division, errors, forceTouchErrors:true});
        if(!isValid) return;
        // alert(JSON.stringify(division, null, 2));
        console.log(division);
        updateToServer(division);
        e.target.reset();
    }
    const updateToServer = (data) => {
        axios.put(`${base_url}/api/division/update/${id}`, data).then(
            (response) => {
                console.log(response);
                navigate("/divlist");
            },
            (error) => {
                console.log(error)
            }
        )
    }
    return (
        <Fragment>
            <Form onSubmit={handleForm} className="ddregister">
                <FormGroup className="text-center">
                    <h1>課の更新</h1>
                </FormGroup>                        
                <Container >
                    <Row className="my-3">
                        <Col md="2">
                            <FormGroup>
                                <Label>部署名</Label>
                            </FormGroup>
                        </Col>
                        <Col md="10">
                            <FormGroup>
                                <Input type="text" id="department_name" name="department_name" value={division.department_name} onChange={onUpdateField} onBlur={onBlurField} />
                                    {errors.department_name.dirty && errors.department_name.error ? (<span style={{color:"red"}}>{errors.department_name.message}</span>) : null} 
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
                                <Input type="text" id="division_name" name="division_name" value={division.division_name} onChange={onUpdateField} onBlur={onBlurField} />
                                {errors.division_name.dirty && errors.division_name.error ? (<span style={{color:"red"}}>{errors.division_name.message}</span>) : null }
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
                                <Input type="checkbox" name="auth_user_edit" id="auth_user_edit" onChange={()=>{}}/>{" "}
                                ユーザー編集権限
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col md="2" />
                        <Col md="10">
                            <FormGroup>
                                <Input type="checkbox" name="aut_expense_category" id="auth_expense_category" onChange={()=>{}} />{" "}
                                勘定科目編集権限
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col md="2" />
                        <Col md="10">
                            <FormGroup>
                                <Input type="checkbox" name="auth_payment_edit" id="auth_payment_edit" onChange={()=>{}} />{" "}
                                支払編集権限
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col md="2" />
                        <Col md="5">
                            <FormGroup className="text-center">
                                <Button type="submit" color="success">更新</Button>
                            </FormGroup>                      
                        </Col>
                        <Col md="5">
                            <FormGroup >
                                <Button  type="reset" color="danger">削除</Button>
                            </FormGroup>
                        </Col>
                    </Row>                   
                </Container>              
            </Form>
        </Fragment>
    )
}

export default DivisionUpdate;