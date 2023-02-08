import React from 'react';
import Navbar from '../navbar/Navbar.component';
import Sidebar from '../sidebar/sidebar.component';
const Home = () => {
       return(
               <div className='home'>
                   <Sidebar />
                   <div className='homeContainer'>
                        <Navbar />
                   </div>
               </div>
       )
}
export default Home;