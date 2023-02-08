import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const DivTable = ({division:{division_id, department_id, division_name}}) => {
    return (
        <tr key = {division_id}>
            <td>{division_id}</td>
            <td>{department_id}</td>
            <td>{division_name}</td>
            <td>
                <Link to={`/divlist/${division_id}`} >
                    <Button outline>編集</Button>
                </Link>
            </td>
        </tr>
    )
} 

export default DivTable;