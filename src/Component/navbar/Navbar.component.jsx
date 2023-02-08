import React from "react";
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReorderIcon from '@mui/icons-material/Reorder';
import './Navbar.css';

const Navbar = () => {
                    return(
                    <div className="navbar">
                          <div className="wrapper">
                             <div className="search">
                                    <LanguageIcon className="navicon"/>
                                     English
                             </div>
                             <div className="items">
                                  <div className="item">
                                     <DarkModeIcon className="navicon"/>
                                  </div>
                                  <div className="item">
                                     <FullscreenIcon className="navicon"/>
                                  </div>
                                  <div className="item">
                                      <NotificationsNoneIcon className="navicon"/>
                                      <div className="counter">1</div>
                                  </div>
                                  <div className="item">
                                      <ChatBubbleOutlineIcon className="navicon"/>
                                      <div className="counter">2</div>
                                  </div>
                                  <div className="item">
                                      <ReorderIcon className="navicon"/>
                                  </div>
                             </div>
                          </div>
                    </div>
            )}
export default Navbar;