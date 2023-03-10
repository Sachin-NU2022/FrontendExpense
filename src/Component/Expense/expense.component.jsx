import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormGroup, Input, Button, Container, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import base_url from '../../api/bootapi';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import './expense.css';

const Expense = ({ expense: { expense_id, app_depart_id, app_division_id, description, payment_destination, entraining_point, arrival_station, amount, note } }) => {

   // Modal open state
   const [modal, setModal] = React.useState(false);
   // Toggle for Modal
   const toggle = () => setModal(!modal);
   let navigate = useNavigate();
   useEffect(() => {
      document.title = "Update Employee || Expense management System"
   }, []);
   const [expense, setExpense] = useState({});

   const loadExpenseList = () => {
      axios.get(`${base_url}/api/expense/search/${expense_id}`).then(
         (response) => {
            console.log(response.data);
            setExpense(response.data);
         }, (error) => {
            console.log(error);
         }
      )
   }
   useEffect(() => {
      loadExpenseList();
   }, [])

   const handleForm = e => {
      e.preventDefault();
      alert(JSON.stringify(expense, null, 2));
      postDatatoServer(expense);
      e.target.reset();
   };
   // creating function to postdata on server
   const postDatatoServer = (data) => {
      axios.put(`${base_url}/api/expense/update/${expense_id}`, data).then(
         (response) => {
            console.log(response);
            toggle();
         }, (error) => {
            console.log(error);
         }
      )
   }

   
   return (
      <tr key={expense_id}>
         <td className='pad'>{app_depart_id}</td>
         <td className='pad'>{app_division_id}</td>
         <td className='pad'>{description}</td>
         <td className='pad'>{payment_destination}</td>
         <td className='pad'>{entraining_point}</td>
         <td className='pad'>{arrival_station}</td>
         <td className='pad'>{amount}</td>
         <td className='pad'>{note}</td>
         <td>
            <Container>
               <Row>
                  <Col md="12">
                     <Button className='editbtn' onClick={toggle}><FaEdit className='editicon' /></Button>
                     <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                        <ModalHeader toggle={toggle}>
                           <h1 className='heading-titlee'>??????????????????</h1>
                        </ModalHeader>
                        <ModalBody>
                           <Container className='container'>
                              <Form onSubmit={handleForm} className="registerform">
                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>????????????</Label>
                                          <select aria-label="Default select example" name="app_depart_id" defaultValue={expense.app_depart_id} onChange={(e) => { setExpense({ ...expense, app_depart_id: e.target.value }) }} className="form-control expinputformdesign" required>
                                             <option selected value="System Department">System Department</option>
                                             <option value="Finance Department">Finance Department</option>
                                             <option value="Development Department">Development Department</option>
                                          </select>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>?????????</Label>
                                          <select aria-label="Default select example" name="app_division_id" defaultValue={expense.app_division_id} onChange={(e) => { setExpense({ ...expense, app_division_id: e.target.value }) }} className="form-control expinputformdesign" required>
                                             <option value="System Development">System Development</option>
                                             <option value="System Support">System Support</option>
                                             <option value="Custom support">Custom Support</option>
                                          </select>
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>?????????</Label>
                                          <textarea
                                             required
                                             className='form-control expinputformdesign'
                                             onChange={(e) => { setExpense({ ...expense, description: e.target.value }) }}
                                             name="description"
                                             defaultValue={expense.description}
                                             rows='2'
                                          >
                                          </textarea>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>?????????</Label>
                                          <Input type="text" id="" name="payment_destination" defaultValue={expense.payment_destination} className="expinputformdesign" onChange={(e) => { setExpense({ ...expense, payment_destination: e.target.value }) }} required />
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <Row>
                                    <Col md="5">
                                       <FormGroup>
                                          <Label>????????? </Label>
                                          <Input type="text" id="" name="entraining_point" defaultValue={expense.entraining_point} className="expinputformdesign" onChange={(e) => { setExpense({ ...expense, entraining_point: e.target.value }) }} required />
                                       </FormGroup>
                                    </Col>
                                    <Col md="2"><h1 className="designbreakbar">~</h1></Col>
                                    <Col md="5">
                                       <FormGroup>
                                          <Label>?????????</Label>
                                          <Input type="text" id="" name="arrival_station" defaultValue={expense.arrival_station} className="expinputformdesign" onChange={(e) => { setExpense({ ...expense, arrival_station: e.target.value }) }} required />
                                       </FormGroup>
                                    </Col>
                                 </Row>

                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>?????? </Label>
                                          <Input type="number" id="" name="amount" defaultValue={expense.amount} className="expinputformdesign" onChange={(e) => { setExpense({ ...expense, amount: e.target.value }) }} required />
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md="12">
                                       <FormGroup>
                                          <Label>??????</Label>
                                          <textarea
                                             required
                                             className='form-control expinputformdesign'
                                             onChange={(e) => { setExpense({ ...expense, note: e.target.value }) }}
                                             name="note"
                                             defaultValue={expense.note}
                                             rows='2'
                                          >
                                          </textarea>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                                 <Row className='marregtop'>
                                    <Col md="2">
                                       <Button type="submit" className="updatebtn">??????</Button>
                                    </Col>
                                    <Col md="8">
                                    </Col>
                                    <Col md="2">
                                       <Button onClick={() => navigate(-1)} className="deletebtn">???????????????</Button>
                                    </Col>
                                 </Row>
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
export default Expense;