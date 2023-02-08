import React from "react";
import Department from "./department.component";
import "./departmentList.css";

const Departments = ({departments}) => {
                                        return(
                                            <div>
                                             <table>
                                                <thead>
                                                    <tr>
                                                        <th className="firstcolumnwidth">項番</th>
                                                        <th className="secondcolumnwidth">部署名</th>
                                                        <th className="thirdcolumnwidth">アクション</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                        {
                                                          departments.length ? departments.map(department => <Department key={departments.department_id} department={department} />) : 
                                                          <div style={{ color: 'red', width: "500px", height:"70px", padding: "20px"}}>検索データが見つかりません。。。</div>
                                                        }
                                                </tbody>
                                            </table>
                                            </div>
                                        )
}

export default Departments;