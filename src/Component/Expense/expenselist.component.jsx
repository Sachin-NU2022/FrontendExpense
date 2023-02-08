import React, {useState, useEffect} from "react";
import { FormGroup, Input, Button, Container, Row, Col, Label} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import base_url from "../../api/bootapi";
import axios from "axios";
import Pagination from "../Employee/pagination.component";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import Sidebar from "../sidebar/sidebar.component";
import Navbar from "../navbar/Navbar.component";
import Expenses from "./expenses.component";
import "./expenselist.css";
const ExpenseList = () => {
        
        useEffect(() => {
               document.title = "ExpenseList || Expense mangement system"
        }, [])

        const [expense, setExpense] = useState();

        // Modal open state
        const [modal, setModal] = React.useState(false);
        // Toggle for Modal
        const toggle = () => setModal(!modal);
        
        const handleForm = (e) => {
            e.preventDefault();
            console.log(expense);
            postDatatoServer(expense);
            e.target.reset();
        }

        const postDatatoServer = (data) => {
                axios.post(`${base_url}/api/expense/register`, data).then(
                        (response) => {
                            console.log(response);
                        }, (error) => {
                            console.log(error);
                        }
        )}

        const [currentPage, setCurrentPage] = useState(1);
        const [recordsPerPage] = useState(5);

         // Function to calling server
        const getExpenseListFromServer = () => {
            axios.get(`${base_url}/api/expense/search`).then(
                (response) => {
                    console.log(response.data);
                    setExpenses(response.data);
                },
                (error) => {
                    console.log(error);
                }
            )
        }

        useEffect(() => {
            getExpenseListFromServer();
        }, [])

        const [expenses, setExpenses] = useState([]);

        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = expenses.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = Math.ceil(expenses.length / recordsPerPage)


        return(
               <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                       <div className="bodydesign">
                          <Container>
                                <Row>
                                <Col md="12">
                                    <h1 className="headingtopdesign">経費一覧</h1>
                                </Col>
                                </Row>
                                <Row className="tablerow">
                                <Col md="12">
                                    <Row className="margin-less">
                                        <Col md="10"></Col>
                                        <Col md="2">
                                            <Button color="danger" className="expregisterbtn" onClick={toggle}><IoIosAddCircleOutline className="icondesigncolor" /></Button>
                                            <Modal size="lg" isOpen={modal} toggle={toggle} className="mainModal">
                                                <ModalHeader toggle={toggle}>
                                                    <h1 className='headingexpensedesign'>経費の登録</h1>
                                                </ModalHeader>
                                                <ModalBody>
                                                    <div>
                                                        <div className='employeeregmaindiv'>
                                                            <Container>
                                                                <Form onSubmit={handleForm}>
                                                                    <Row>
                                                                        <Col md="12">
                                                                            <FormGroup>
                                                                                <Label>所属部署</Label>
                                                                                <select aria-label="Default select example" onChange={(e) => { setExpense({ ...expense, app_depart_id: e.target.value }) }} className="form-control expinputformdesign" required>
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
                                                                                <Label>所属課</Label>
                                                                                <select aria-label="Default select example" onChange={(e) => { setExpense({ ...expense, app_division_id: e.target.value }) }} className="form-control expinputformdesign" required>
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
                                                                                <Label>摘要欄</Label>
                                                                                <textarea
                                                                                    required
                                                                                    className='form-control expinputformdesign'
                                                                                    onChange={(e) => { setExpense({...expense, description:e.target.value}) }} 
                                                                                    name=''
                                                                                    rows='2'
                                                                                    >
                                                                                </textarea>
                                                                           </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md="12">
                                                                           <FormGroup>
                                                                                <Label>支払先</Label>
                                                                                <Input type="text" id="" name="" className="expinputformdesign" onChange={(e) => { setExpense({ ...expense,  payment_destination: e.target.value })}} required/>
                                                                           </FormGroup>
                                                                        </Col>
                                                                    </Row>

                                                                    <Row>
                                                                        <Col md="5">
                                                                           <FormGroup>
                                                                                <Label>乗車駅 </Label>
                                                                                <Input type="text" id="" name="" className="expinputformdesign" onChange={(e) => { setExpense({ ...expense,  entraining_point: e.target.value })}} required/>
                                                                           </FormGroup>
                                                                        </Col>
                                                                        <Col md="2"><h1 className="designbreakbar">~</h1></Col>
                                                                        <Col md="5">
                                                                           <FormGroup>
                                                                                <Label>降車駅</Label>
                                                                                <Input type="text" id="" name="" className="expinputformdesign" onChange={(e) => { setExpense({ ...expense,  arrival_station: e.target.value })}} required/>
                                                                           </FormGroup>
                                                                        </Col>
                                                                    </Row>

                                                                    <Row>
                                                                        <Col md="12">
                                                                           <FormGroup>
                                                                                <Label>金額 </Label>
                                                                                <Input type="number" id="" name="" className="expinputformdesign" onChange={(e) => { setExpense({ ...expense,  amount: e.target.value })}} required/>
                                                                           </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md="12">
                                                                           <FormGroup>
                                                                                <Label>備考</Label>
                                                                                <textarea
                                                                                    required
                                                                                    className='form-control expinputformdesign'
                                                                                    onChange={(e) => { setExpense({...expense, note:e.target.value})}} 
                                                                                    name=''
                                                                                    rows='2'
                                                                                    >
                                                                                </textarea>
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
                                                                            <Button onClick={toggle} className="deletebtn">キャンセル</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Form>
                                                            </Container>
                                                        </div>
                                                    </div>
                                                </ModalBody>

                                            </Modal>
                                        </Col>
                                    </Row>
                                    <Row className="margin-less">
                                        <Col md="12">
                                            <Expenses expenses={currentRecords} />
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
        )
}
export default ExpenseList;