import React from "react";
import Division from "./division.component";
import "./divisionList.css";

const Divisions = ({divisions}) => {
                                        return(
                                            <div>
                                             <table>
                                                <thead>
                                                    <tr>
                                                        <th className="firsttablewidth">項目番号</th>
                                                        <th className="secondtablewidth">部署名</th>
                                                        <th className="thirdtablewidth">課名</th>
                                                        <th className="fourthtablewidth">アクション</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                        {
                                                          divisions.length ? divisions.map(division => <Division key={divisions.division_id} division={division} />) :
                                                           <div style={{ color: 'red', width: "500px", height:"70px", padding: "20px"}}>検索データが見つかりません。。。</div>
                                                        }
                                                </tbody>
                                            </table>
                                            </div>
                                        )
}

export default Divisions;