import React, { useEffect } from "react"; 
import { Container } from "reactstrap";
import DivisionSearch from "./DivisionSearch";
import DivisionTable from "./DivisionTable";

function DivisionList() {
    useEffect(() => {
        document.title="DivisionList || NU Expense Management System"
    },[])
    return (
        <div>
            <Container>
                    <h1 className="text-center">課一覧</h1>
                    <DivisionSearch />
                    <DivisionTable />                   
            </Container>
        </div>
    )
}

export default DivisionList;