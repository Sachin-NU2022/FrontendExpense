import React, {useEffect, useState} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import Divisions from "./DivisionTableCom";

function DivisionTable() {
    useEffect(() => {
        document.title="DivisionTable || NU Expense Management System"
    },[])
    const [divisions, setDivisions] = useState([])
    const getDivisionListfromServer = () => {
        axios.get(`${base_url}/api/division/search`).then(
            (response)=> {
                console.log(response.data);
                setDivisions(response.data);
            }, 
            (error) =>{
                console.log(error);
            }
        )
    }
    useEffect(() => {
        getDivisionListfromServer();
    },[])
    return (
       <table>
            <tbody>
                <Divisions divisions={divisions} />
            </tbody>
       </table>
    )
}

export default DivisionTable;