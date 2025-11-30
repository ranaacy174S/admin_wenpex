import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const emailId = sessionStorage.getItem('emailId');
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
    }

    return (
        <>
            <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
                <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
                <a className="navbar-brand pe-3 ps-4 ps-lg-3" href="/dashboard">
                    <img src="/assets/img/favicon.png" className="img-fluid" alt="" />
                </a>
                <ul className="navbar-nav align-items-center ms-auto">

                    <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="img-fluid" src="/assets/img/dummy.png" alt="" /></a>
                        <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                            <h6 className="dropdown-header d-flex align-items-center">
                                <img className="dropdown-user-img" src="/assets/img/dummy.png" alt="" />
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name" style={{ textAlign: 'center' }}></div>
                                    <div className="dropdown-user-details-email" style={{ paddingTop: '8px' }}>{emailId}</div>
                                </div>
                            </h6>
                            <button type="button" className="dropdown-item justify-content-center" onClick={handleLogout} style={{ justifycontent: "center" }}>
                                logout
                                <div className="dropdown-item-icon ms-2"><i className="fa fa-power-off"></i></div>

                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};
export default Header;