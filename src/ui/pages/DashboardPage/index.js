import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../../customComponent/Header";
import { useEffect } from "react";

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('');
    const myPermission = sessionStorage.getItem('permissions');
    const userType = sessionStorage.getItem('userType');
    let permissions = Array.isArray(JSON.parse(myPermission)) ? JSON.parse(myPermission)?.map(x => x.value) : [];

    useEffect(() => {
        let URL = window.location.href?.split('/');
        let route = URL.pop();
        setActiveTab(route)
    }, []);

    return (
        <>
            <Header />
            <div id="layoutSidenav" >
                <div id="layoutSidenav_nav">
                    <nav className="sidenav shadow-right sidenav-light">
                        <div className="sidenav-menu">
                            <div className="nav accordion" id="accordionSidenav">
                                <div className="sidenav-menu-heading">pages</div>

                                <Link to="/dashboard/homepage" className={`nav-link collapsed ${activeTab?.includes('homepage') ? 'active' : ''}`} onClick={() => setActiveTab('homepage')}>
                                    <div className="nav-link-icon"><i className="fa fa-th"></i></div>
                                    Dashboards
                                </Link>

                                {userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${activeTab?.includes('listsubadmin') || activeTab?.includes('addsubadmin') ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseSubAdmin" aria-expanded="false" aria-controls="collapseSubAdmin">
                                            <div className="nav-link-icon"><i className="fa fa-user-friends"></i></div>
                                            Sub Admin
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>
                                        <div className="collapse" id="collapseSubAdmin" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">
                                                <Link className={`nav-link  ${activeTab?.includes('listsubadmin') ? 'active' : ''}`} to="listsubadmin" onClick={() => setActiveTab('listsubadmin')}>Sub Admin List</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('addsubadmin') ? 'active' : ''}`} to="addsubadmin" onClick={() => setActiveTab('addsubadmin')}>Add New</Link>
                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }

                                {permissions.includes(1) || userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${activeTab?.includes('tradelist') ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseTraders" aria-expanded="false" aria-controls="collapseTraders">
                                            <div className="nav-link-icon"><i className="fa fa-wave-square"></i></div>
                                            Traders
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>

                                        <div className="collapse" id="collapseTraders" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">
                                                <Link className={`nav-link  ${activeTab?.includes('tradelist') ? 'active' : ''}`} to="tradelist" onClick={() => setActiveTab('tradelist')}>Traders List</Link>

                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }

                                {permissions.includes(2) || userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${(activeTab?.includes('pendingkyc') || activeTab?.includes('approvedkyc') || activeTab?.includes('RejectedKyc')) ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseKyc" aria-expanded="false" aria-controls="collapseKyc">
                                            <div className="nav-link-icon"><i className="fa fa-check-circle"></i></div>
                                            KYC Manager
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>

                                        <div className="collapse" id="collapseKyc" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">

                                                <Link className={`nav-link ${activeTab?.includes('pendingkyc') ? 'active' : ''}`} to="pendingkyc" onClick={() => setActiveTab('pendingkyc')}>Pending KYC</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('approvedkyc') ? 'active' : ''}`} to="approvedkyc" onClick={() => setActiveTab('approvedkyc')}>Approved KYC</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('RejectedKyc') ? 'active' : ''}`} to="RejectedKyc" onClick={() => setActiveTab('RejectedKyc')}>Rejected KYC</Link>
                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }


                                {permissions.includes(11) || userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${(activeTab?.includes('packageManagement') || activeTab?.includes('packageManagement')) ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapsePackageManagement" aria-expanded="false" aria-controls="collapsePackageManagement">
                                            <div className="nav-link-icon"><i className="fa fa-list"></i></div>
                                            Staking Package Management
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>

                                        <div className="collapse" id="collapsePackageManagement" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">
                                                <Link className={`nav-link  ${activeTab?.includes('packageManagement') ? 'active' : ''}`} to="packageManagement" onClick={() => setActiveTab('packageManagement')}>Package List</Link>
                                                <Link className={`nav-link  ${activeTab?.includes('addPackage') ? 'active' : ''}`} to="addPackage" onClick={() => setActiveTab('addPackage')}>Add New Package</Link>
                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }

                                {permissions.includes(11) || userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('StakingDetails') ? 'active' : ''}`} to="StakingDetails" onClick={() => setActiveTab('StakingDetails')}>
                                        <div className="nav-link-icon"><i class="fa fa-dollar-sign"></i></div>
                                        Staking Transactions
                                    </Link>
                                    : null
                                }
                                {permissions.includes(11) || userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('CoinListApplications') ? 'active' : ''}`} to="CoinListApplications" onClick={() => setActiveTab('CoinListApplications')}>
                                        <div className="nav-link-icon"><i class="fa fa-bars"></i></div>
                                        CoinList Applications
                                    </Link>
                                    : null
                                }

                                {permissions.includes(12) || userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${(activeTab?.includes('addform')) || activeTab?.includes('formlist') ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseaddform" aria-expanded="false" aria-controls="collapseaddform">
                                            <div className="nav-link-icon"><i className="fab fa-google-wallet"></i></div>
                                            Launchpad
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>
                                        <div className="collapse" id="collapseaddform" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">

                                                <Link className={`nav-link  ${activeTab?.includes('addform') ? 'active' : ''}`} to="addform" onClick={() => setActiveTab('addform')}>Add Project</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('formlist') ? 'active' : ''}`} to="formlist" onClick={() => setActiveTab('formlist')}>Project List</Link>
                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }

                                {userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${(activeTab?.includes('Broker') || activeTab?.includes('AllBrokeList')) ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseBrokert" aria-expanded="false" aria-controls="collapseSubAdmin">
                                            <div className="nav-link-icon"><i className="fa fa-dollar-sign"></i></div>
                                            Broker Management
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>

                                        <div className="collapse" id="collapseBrokert" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">
                                                <Link className={`nav-link  ${activeTab?.includes('Broker') ? 'active' : ''}`} to="Broker" onClick={() => setActiveTab('Broker')}>Add Broker</Link>
                                                <Link className={`nav-link  ${activeTab?.includes('AllBrokeList') ? 'active' : ''}`} to="BrokerList" onClick={() => setActiveTab('AllBrokeList')}>Broker List</Link>
                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }
                                {permissions.includes(3) || userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('currencymanagement') ? 'active' : ''}`} to="currencymanagement" onClick={() => setActiveTab('currencymanagement')}>
                                        <div className="nav-link-icon"><i className="fa fa-dollar-sign"></i></div>
                                        Currency Management
                                    </Link>
                                    : null
                                }

                                {permissions.includes(5) || userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('currencypair') ? 'active' : ''}`} onClick={() => setActiveTab('currencypair')} to="currencypair">
                                        <div className="nav-link-icon"><i className="fa fa-prescription"></i></div>
                                        Currency Pair Management
                                    </Link>
                                    : null
                                }
                                {permissions.includes(7) || userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${(activeTab?.includes('fundsDManagement') || activeTab?.includes('FundsPendingDeposit')) ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseFundsManagement" aria-expanded="false" aria-controls="collapseSubAdmin">
                                            <div className="nav-link-icon"><i className="fa fa-dollar-sign"></i></div>
                                            Funds Deposit Management
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>

                                        <div className="collapse" id="collapseFundsManagement" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">
                                                <Link className={`nav-link  ${activeTab?.includes('fundsDManagement') ? 'active' : ''}`} to="fundsDManagement" onClick={() => setActiveTab('fundsDManagement')}>Completed Deposit</Link>
                                                <Link className={`nav-link  ${activeTab?.includes('FundsPendingDeposit') ? 'active' : ''}`} to="FundsPendingDeposit" onClick={() => setActiveTab('FundsPendingDeposit')}>Pending Deposit</Link>
                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }

                                {permissions.includes(7) || userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${(activeTab?.includes('fundsManagement') || activeTab?.includes('FundsPendingWithdrawal') || activeTab?.includes('FundsCancelledWithdrawal')) ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapsefundsWithdrawal" aria-expanded="false" aria-controls="collapsefundsWithdrawal">
                                            <div className="nav-link-icon"><i className="fab fa-google-wallet"></i></div>
                                            Funds Withdrawal Management
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>
                                        <div className="collapse" id="collapsefundsWithdrawal" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">
                                                <Link className={`nav-link  ${activeTab?.includes('fundsManagement') ? 'active' : ''}`} to="fundsManagement" onClick={() => setActiveTab('fundsManagement')}>Completed Withdrawal</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('FundsPendingWithdrawal') ? 'active' : ''}`} to="FundsPendingWithdrawal" onClick={() => setActiveTab('FundsPendingWithdrawal')}>Pending Withdrawal</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('FundsCancelledWithdrawal') ? 'active' : ''}`} to="FundsCancelledWithdrawal" onClick={() => setActiveTab('FundsCancelledWithdrawal')}>Cancelled Withdrawal</Link>

                                            </nav>
                                        </div>
                                    </>
                                    : null
                                }
                                {permissions.includes(6) || userType === '1' ?
                                    <>
                                        <div className={`nav-link collapsed ${(activeTab?.includes('TradingCommision') || activeTab?.includes('WithdrawalFees') || activeTab?.includes('MiscellaneousPage')) ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseTradingCommision" aria-expanded="false" aria-controls="collapseTradingCommision">
                                            <div className="nav-link-icon"><i className="fab fa-google-wallet"></i></div>
                                            Exchange Profit
                                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </div>
                                        <div className="collapse" id="collapseTradingCommision" data-bs-parent="#accordionSidenav">
                                            <nav className="sidenav-menu-nested nav">

                                                <Link className={`nav-link  ${activeTab?.includes('TradingCommision') ? 'active' : ''}`} to="TradingCommision" onClick={() => setActiveTab('TradingCommision')}>   Trading Commision</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('WithdrawalFees') ? 'active' : ''}`} to="WithdrawalFees" onClick={() => setActiveTab('WithdrawalFees')}> Withdrawal Fees</Link>

                                                <Link className={`nav-link  ${activeTab?.includes('MiscellaneousPage') ? 'active' : ''}`} to="MiscellaneousPage" onClick={() => setActiveTab('MiscellaneousPage')}>Miscellaneous Transaction </Link>

                                            </nav>
                                        </div>

                                    </>
                                    : null
                                }
                                {permissions.includes(4) || userType === '1' ? (
                                    <Link className={`nav-link collapsed ${activeTab?.includes('tradersbalance') ? 'active' : ''}`} to="tradersbalance" onClick={() => setActiveTab("tradersbalance")}>
                                        <div className="nav-link-icon"><i className="fa fa-wallet"></i></div>
                                        Exchange Wallet Management
                                    </Link>
                                ) : null}
                                {permissions.includes(8) || userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('tradingfeereport') ? 'active' : ''}`} to="tradingfeereport" onClick={() => setActiveTab('tradingfeereport')}>
                                        <div className="nav-link-icon"><i className="fa fa-wave-square"></i></div>
                                        Market Trades
                                    </Link>
                                    : null
                                }
                                {permissions.includes(9) || userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('OrderBook') ? 'active' : ''}`} to="OrderBook" onClick={() => setActiveTab('OrderBook')}>
                                        <div className="nav-link-icon"><i className="fa fa-list"></i></div>
                                        OrderBook
                                    </Link>
                                    : null
                                }
                                {permissions.includes(10) || userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('notification') ? 'active' : ''}`} to="notification" onClick={() => setActiveTab('notification')}>
                                        <div className="nav-link-icon"><i className="fa fa-bell"></i></div>
                                        Notifications Management
                                    </Link>
                                    : null
                                }


                                {userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('bannerManagement') ? 'active' : ''}`} to="bannerManagement" onClick={() => setActiveTab('bannerManagement')}>
                                        <div className="nav-link-icon"><i className="fa fa-image"></i></div>
                                        Banner Management
                                    </Link>
                                    : null
                                }

                                {userType === '1' ?
                                    <Link className={`nav-link collapsed ${activeTab?.includes('SupportRequest') ? 'active' : ''}`} to="SupportRequest" onClick={() => setActiveTab('SupportRequest')}>
                                        <div className="nav-link-icon"><i className="fa fa-wave-square"></i></div>
                                    SupportRequest
                                    </Link>
                                    : null
                                }
                            </div>
                        </div>
                    </nav >
                </div >
                <Outlet />
            </div>
        </>
    )
}

export default DashboardPage;