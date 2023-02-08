import { useEffect, useState} from 'react';
import axios from 'axios';
import {FormGroup, Input ,  Button, Container, Row, Col} from 'reactstrap';
import base_url from '../../api/bootapi';
import Form from 'react-bootstrap/Form';
import './expensecategoryregister.css';

const NewExpenseCategoryRegister = () => {
       
            useEffect(() => {
                  document.title = "Expense Category || Expense Category Registration Form";
            }, []);

            const [category, setCategory] = useState({
                 expense_category_name: ""
            });

            const [validation, setValidation] = useState({
                  expense_category_name: ""
            });

            //handle submit updates
            function handleChange(event) {
               const { name, value } = event.target;
               setCategory({ ...category, [name]: value });
            }

            const handleForm = (e) => {
                      e.preventDefault();
                      console.log(category);
                      postDatatoServer(category);
                      e.target.reset();
            }
          
            const checkValidation = () => {
                let errors = validation;
                //first Name validation
                if (!category.expense_category_name.empty()) {
                  errors.expense_category_name = "First name is required";
                } else {
                  errors.expense_category_name = "";
                }
                setValidation(errors);
              };
              useEffect(() => {
                checkValidation();
              }, [category]);
            
          
            const postDatatoServer = (data) => {
                axios.post(`${base_url}/api/expensecat/register`, data).then(
                      (response) => {
                            console.log(response);
                      }, (error) => {
                            console.log(error);
                      }
            )}

            return(
                    <div>
                    <h1 className='heading-title'>Create Expense Category</h1>
                    <div className='expensecatregmaindiv'>
                    <Container>
                              <Form onSubmit={handleForm} className="catregisterform">
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>項目名</label><br />
                                                <Input 
                                                type="text" 
                                                id="expense_category_name"
                                                name="expense_category_name"
                                                className="inputdesign"
                                                onChange={(e) => handleChange(e)} 
                                                value={category.expense_category_name} />
                                                {validation.expense_category_name && <p>{validation.expense_category_name}</p>}
                                                {validation.expense_category_name && console.log(validation)}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className='martop'>
                                        <Col md="6">
                                        </Col>
                                        <Col md="6" className='designcol'>
                                            <Row>
                                             <Col md="4">
                                                <Button type="submit" className="registerbtn">登録</Button>
                                             </Col>
                                             <Col md="4"> 
                                                <Button type="submit" className="updatebtn">更新</Button>
                                             </Col>
                                             <Col md="4">
                                                <Button type="submit" className="deletebtn">削除</Button>
                                            </Col>
                                         </Row>
                                        </Col>
                                    </Row>
                              </Form>
                    </Container>   
                    </div>
                    </div>
)}
export default NewExpenseCategoryRegister;