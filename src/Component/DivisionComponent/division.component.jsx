import React, { useEffect, useState } from "react";
import { Input, FormGroup, Button, Container, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import "./divisionList.css";
import { useFormValidator } from "./inputValidator";
import { FaEdit } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Division = ({division: {division_id, department_name, division_name, auth_user_edit, auth_expense_category, auth_payment_edit, del_flg}}) => {
     // Modal open state
     const [modal, setModal] = React.useState(false);
     // Toggle for Modal
     const toggle = () => {
         loadDivisionList();
         setModal(!modal);
     }
     const reload=()=>window.location.reload();
     let navigate = useNavigate();
 
     useEffect(() => {
         document.title = "Update Division || Expense management System"
     }, []);

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
     
       useEffect(() => {
              fetchOptionData();
       }, [])

     const loadDivisionList = () => {
         axios.get(`${base_url}/api/division/search/${division_id}`).then(
             (response) => {
                 console.log(response.data);
                 setDivision(response.data);
             }, (error) => {
                 console.log(error);
             }
         )
     }
     const [division, setDivision] = useState("");
     const { errors, validateForm } = useFormValidator(division);
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
        postDatatoServer(division);
        e.target.reset();
    }
    
     // creating function to postdata on server
     const postDatatoServer = (data) => {
         axios.put(`${base_url}/api/division/update/${division_id}`, data).then(
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
        axios.put(`${base_url}/api/division/delete/${data.division_id}`, data).then(
            (response) => {
                console.log("division deleted successfully");
                reload();
            },(error) => {
                console.log(error);
            }
        )
    }
    return(
       <tr key={division_id}>
             {
             del_flg ? 
             <td style={{background : "#FA8072", color : "#212666"}} >
                {division_id}
             </td>:
             <td style={{background : "#F5F5F5", color : "#212666"}} >
                {division_id}
             </td>
             }
             <td>{department_name}</td>
             <td>{division_name}</td>
             <td>
             <Container>
                <Row>
                <Col md="12">
                <Button className='editbtn' onClick={toggle}><FaEdit className='editicon' /></Button>
                <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                    <ModalHeader toggle={toggle}>
                        <h1 className='headingdivisiondesign'>課の更新</h1>
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
                        <select className="form-control registerinputdesign" defaultValue={department_name} onChange={(e) => { setDivision({ ...division, department_name: e.target.value }) }} required>
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
                             <Input type="text" id="division_name" name="division_name" defaultValue={division_name}  onChange={onUpdateField} className="departinputdesign" />
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
                            <Input type="checkbox" name="auth_user_edit" vhid="auth_user_edit" defaultChecked={auth_user_edit} defaultValue={auth_user_edit} onChange={onUpdateField} />{" "}
                            ユーザー編集権限
                          </FormGroup>
                          </Col>
                          </Row>
                          <Row className="my-2">
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
                              <Row className="margindivisiontop">
                              <Col md="3">
                              <Button type="submit" className="registerbtn">更新</Button>
                              </Col>
                              <Col md="6">
                              </Col>
                              {
                              del_flg ? 
                              <Col md="3">
                                <Button onClick={() => {submit(division)}} className="deletebtn">復元</Button> 
                              </Col> :
                              <Col md="3">
                                <Button onClick={() => {submit(division)}} className="deletebtn">削除</Button> 
                              </Col>
                              }                              
                              </Row>             
                        </Container>
                        </Form>
                    </ModalBody>
                </Modal>
                </Col>
                </Row>                                                         
             </Container>
             </td>
       </tr>
    )
}
export default Division;                                  