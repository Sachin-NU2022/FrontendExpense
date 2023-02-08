import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './sidebar.css';
const Sidebar = () => {
    let fetchData = sessionStorage.getItem("loginID");
    let userData = JSON.parse(fetchData);
    console.log(userData.staffNumber);
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem("loginID");
        navigate("/login")
    }
     return(
                    <div className="sidebar">
                        <div className="top">
                            <span className="logo">
                                {userData.staffNumber === "1" ? "NUAdmin" : "NUEmployee"}
                            </span>
                        </div>
                        <hr />
                        <div className="center">
                            <ul>
                                 <li>
                                    <DashboardIcon className="icon" />
                                    <Link to="/home" className="linkdesign">
                                    <span>ダッシュボード</span>
                                    </Link>
                                </li> 
                                 <p className="title">経費</p>
                                {
                                    userData.staffNumber === "1" ?
                                    <li>
                                        <ViewModuleIcon className="icon"/>
                                        <Link to="/expcatlist" className="linkdesign">
                                            <span>カテゴリー</span>
                                        </Link>
                                    </li> : ""
                                }
                                <li>
                                    <FormatListBulletedIcon className="icon" />
                                    <Link to="/explist" className="linkdesign">
                                    <span>経費一覧</span>
                                    </Link>
                                </li>
                                <p className="title">社員</p>
                                {
                                    userData.staffNumber === "1" ?  <li>
                                    <ViewModuleIcon className="icon"/>
                                    <Link to="/departlist" className="linkdesign">
                                    <span>部署</span>
                                    </Link>
                                    </li> : ""
                                }
                                {
                                    userData.staffNumber === "1" ?  <li>
                                    <ViewModuleIcon className="icon"/>
                                    <Link to="/divlist" className="linkdesign">
                                    <span>課</span>
                                    </Link>
                                    </li> : ""
                                }
                                {
                                    userData.staffNumber === "1" ?
                                        <li>
                                        <FormatListBulletedIcon className="icon" />
                                        <Link to="/emplist" className="linkdesign">
                                        <span>社員一覧</span>
                                        </Link>
                                        </li> : ""
                                }
                                <br />
                                <li>
                                    <SettingsIcon className="icon" />
                                    <span>設定</span>
                                </li>
                                <li>
                                    <AccountCircleIcon className="icon" />
                                    <span>プロフィール</span>
                                </li>
                                <li>
                                    <LogoutIcon className="icon" />
                                    <Link to="/login" className="linkdesign">
                                        <span onClick={logout}>ログアウト</span> 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
             )
}
export default Sidebar;