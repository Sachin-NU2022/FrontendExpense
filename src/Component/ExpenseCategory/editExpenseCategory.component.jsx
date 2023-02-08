import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {FormGroup, Input , Button, Container, Row, Col} from 'reactstrap';
import base_url from '../../api/bootapi';
import Form from 'react-bootstrap/Form';
import './expensecategoryregister.css';
import {useParams, useNavigate} from "react-router-dom";
import Sidebar from '../sidebar/sidebar.component';
import Navbar from '../navbar/Navbar.component';
const EditExpenseCategory = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        document.title = "Expense Category || Expense Category Registration Form";
    }, []);

    const [category, setCategory] = useState({});
    const loadExpenseCategoryList = () => {
           axios.get(`${base_url}/api/expensecat/search/${id}`).then(
            (response) => {
                console.log(response.data);
                setCategory(response.data);
            },
            (error) => {
                console.log(error);
            })
    }

    useEffect(() => {
            loadExpenseCategoryList();
    },[])



    const handleForm = (e) => {
        e.preventDefault();
        console.log(category);
        postDatatoServer(category);
        e.target.reset();
    }

    const postDatatoServer = (data) => {
        axios.put(`${base_url}/api/expensecat/update/${id}`, data).then(
            (response) => {
                console.log(response);
                navigate("/expcatlist");
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
          
            <div className='expensecatregmaindiv'>
                <h1 className='headingupdatecategory'>経費カテゴリの更新</h1>
                <Container>
                    <Form onSubmit={handleForm} className="catregisterform">
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <label>項目名</label><br />
                                    <Input type="text" id="" name="" className="inputdesign" defaultValue={category.expense_category_name} onChange={(e) => { setCategory({ ...category, expense_category_name: e.target.value }) }} required />
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

export default EditExpenseCategory;