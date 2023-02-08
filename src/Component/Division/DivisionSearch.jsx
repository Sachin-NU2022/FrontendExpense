import React, {useEffect, useState} from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Col, Form, Input, Label, Modal, Row } from "reactstrap";
import DivisionRegistration from "./DivisionRegistration";

function DivisionSearch() {
    useEffect(() => {
        document.title="DivisionSearch || NU Expense Management System"
    },[])
    const [openDivReg, setDivReg] = useState(false);
    const toggle = () => {setDivReg(!openDivReg)};
    return (
        <div>
            <Form>
                <Row>
                    <Col md="10">
                        <Label>課名</Label>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <Input />
                    </Col>                
                </Row>
                <Row className="my-2">
                    <Col md="2">
                        <Row>
                            <Col md="6">
                                <Button className="btnsearch">検索</Button>
                            </Col>
                            <Col md="6">
                                <Button className="btnclear" type="reset" outline>クリア</Button>
                            </Col>
                        </Row>                          
                    </Col>
                    <Col md="9" /> 
                    <Col md="1" className="btnboxdesign">
                        <IoIosAddCircleOutline className="btnbox btnbtn" onClick={toggle} />
                    </Col>
                </Row>
            </Form>
            <Modal isOpen={openDivReg} toggle={toggle}>
                <DivisionRegistration />
            </Modal>
        </div>
    )
}

export default DivisionSearch;