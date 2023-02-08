import axios from "axios";
import React, { useEffect, useState} from "react";
import { Fragment } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import base_url from "../../api/bootapi";
import { useFormValidator } from "./inputValidator";

function DivisionRegistration() {
    const [division, setDivision] = useState("");
    const { errors, validateForm, onBlurField } = useFormValidator(division);
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
        alert(JSON.stringify(division, null, 2));
        console.log(division);
        postToServer(division);
        e.target.reset();
    }
    const postToServer = (data) => {
        axios.post(`${base_url}/api/division/register`, data).then(
            (response) => {
                console.log(response);
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
                    <h1>課の登録</h1>
                </FormGroup>                        
                <Container >
                    <Row>
                        <Col md="2">
                            <FormGroup>
                                <Label>所属部署</Label>
                            </FormGroup>
                        </Col>
                        <Col md="10">                        
                            <FormGroup >
                                    <select defaultValue="部署名を選択" className="dropdownbox" aria-label="Default select example"  id="department_id" name="department_id" onChange={(e) => {setDivision({...division, department_id: e.target.value})}} required>
                                        <option hidden>部署名を選択</option>
                                        <option value="1">管理部署</option>
                                        <option value="2">技術部署</option>
                                        <option value="3">材料</option>
                                        <option value="4">財務部</option>
                                        <option>スポーツ部</option>
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
                        <Col md="4" />
                        <Col md="4">
                            <FormGroup className="text-center">
                                <Button type="submit" color="success">登録</Button>
                            </FormGroup>                      
                        </Col>
                        <Col md="4" />
                    </Row>                   
                </Container>              
            </Form>
        </Fragment>
    )
}

export default DivisionRegistration;