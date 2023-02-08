import React from "react";
import DivTable from "./DivTable";

const Divisions = ({divisions}) => {
    return (
        <table className="tabledesignn">
            <thead className="thdddesign">
                <tr>
                    <th>項目番号</th>
                    <th>部署名</th>
                    <th>課名</th>
                    <th>アクション</th>
                </tr>
            </thead>
            <tbody>
                {divisions.map(division => <DivTable key={divisions.division_id} division={division} />)}
            </tbody>
        </table>
    )
}

export default Divisions;