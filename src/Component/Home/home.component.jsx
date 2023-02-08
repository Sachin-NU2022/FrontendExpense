import React , {useEffect} from 'react';
import './home.css';
import Navbar from '../../Component/navbar/Navbar.component';
import Sidebar from '../../Component/sidebar/sidebar.component';
const Home = () => {
    let fetchData = sessionStorage.getItem("loginID");
    let userData = JSON.parse(fetchData);
    return(
      <div className='home'>
        <Sidebar />
        <div className='homeContainer'>
           <Navbar />
           <div className='bodydesign'>
               <h1 className='homeheading'>
                   {
                      userData.staffNumber === "1" ?  "管理者ダッシュボード ページへようこそ"  : "社員ダッシュボード ページへようこそ"
                   }
               </h1>
           </div>
        </div>
      </div>
)}
export default Home;