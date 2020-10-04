import React from 'react';
import './community.css'
import {Link} from "react-router-dom";


const SideBar = () => {
    return (
        <>
            <nav className="sidebar sidebar-offcanvas">
                <ul className="nav">
                    <li className="<br/>">
                        <a className="nav-link">
                            <span className="menu-title"><Link to="/Community/userBoard">자유 게시판</Link></span>
                        </a>
                    </li><br/>
                    <li className="nav-item">
                        <a className="nav-link">
                            <span className="menu-title"><Link to="/Community/CustomerServiceCenter">고객서비스센터</Link></span>
                        </a>
                    </li><br/>
                    <li className="nav-item">
                        <a className="nav-link">
                            <span className="menu-title"><Link to="/Community/QueAn">Q&A</Link></span>
                        </a>
                    </li><br/>


                </ul>
            </nav>
        </>
    );
};

export default SideBar;