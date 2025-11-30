import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "../ui/pages/LoginPage";
import ForgetpasswordPage from "../ui/pages/ForgetpasswordPage";
import DashboardPage from "../ui/pages/DashboardPage";
import HomePage from "../ui/pages/HomePage";
import AddsubAdmin from "../ui/pages/AddsubAdmin";
import SubadminList from "../ui/pages/SubadminList";
import ApprovedKyc from "../ui/pages/ApprovedKyc";
import PendingKyc from "../ui/pages/PendingKyc";
import AddTrade from "../ui/pages/AddTrade";
import TradeList from "../ui/pages/TradeList";
import CurrencyManagement from "../ui/pages/CurrencyManagement";
import CurrencypairManagement from "../ui/pages/CurrencypairManagement";
import TradersBalance from "../ui/pages/ExchangeWalletManagement";
import TradingReport from "../ui/pages/TradingReport";
import FundsManagement from "../ui/pages/FundsCompletedWithdrawal";
import FundsCancelledWithdrawal from "../ui/pages/FundsCancelledWithdrawal";
import FundsPendingWithdrawal from "../ui/pages/FundsPendingWithdrawal";
import FundsDManagement from "../ui/pages/FundsCompletedDeposit";
import WithdrawalFees from "../ui/pages/WithdrawalFees";
import MiscellaneousPage from "../ui/pages/MiscellaneousPage";
import Notification from "../ui/pages/Notification";
import ContentManager from "../ui/pages/ContentManager";
import BannerManagement from "../ui/pages/BannerManagement";
import RejectedKyc from "../ui/pages/RejectedKyc";
import TradingCommision from "../ui/pages/TradingCommision";
import OrderBook from "../ui/pages/OrderBook";
import FundsPendingDeposit from "../ui/pages/FundsPendingDeposit";
import { ToastContainer } from "react-toastify";
import StakingDetails from "../ui/pages/StakingDetails";
import PackageManagement from "../ui/pages/StakingPackageManagement"
import AddPackage from "../ui/pages/AddStakingPackage";
import Add from "../ui/pages/Launchpad/AddProject";
import History from "../ui/pages/Launchpad/History";
import FormList from "../ui/pages/Launchpad/ProjectList";
import Broker from "../ui/pages/Broker";
import BrokerList from "../ui/pages/Broker/BrokerList";
import SupportRequest from "../ui/pages/SupportRequest";
import CoinListApplications from "../ui/pages/CoinListApplications";
import CoinListDetails from "../ui/pages/CoinListApplications/CoinListDetails";

// import 'bootstrap/dist/css/bootstrap.min.css';

const Routing = () => {
    const token = sessionStorage.getItem('token');

    return (
        <Router>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover limit={1} theme="light" />
            <Routes>
                {token ?
                    <>
                        <Route exact path="/dashboard" element={<DashboardPage />} >
                            <Route index path="*" element={<HomePage />}></Route>
                            <Route exect path="homepage" element={<HomePage />}></Route>
                            <Route exect path="listsubadmin" element={<SubadminList />}></Route>
                            <Route exect path="addsubadmin" element={<AddsubAdmin />}></Route>
                            <Route exect path="tradelist" element={<TradeList />}></Route>
                            <Route exect path="addnewtrade" element={<AddTrade />}></Route>
                            <Route exect path="pendingkyc" element={<PendingKyc />}></Route>
                            <Route exect path="approvedkyc" element={<ApprovedKyc />}></Route>
                            <Route exect path="currencymanagement" element={<CurrencyManagement />}></Route>
                            <Route exect path="currencypair" element={<CurrencypairManagement />}></Route>
                            <Route exect path="tradingfeereport" element={<TradingReport />}></Route>
                            <Route exect path="tradersbalance" element={<TradersBalance />}></Route>
                            <Route exect path="fundsManagement" element={<FundsManagement />}></Route>
                            <Route exect path="FundsCancelledWithdrawal" element={<FundsCancelledWithdrawal />}></Route>
                            <Route exect path="FundsPendingWithdrawal" element={<FundsPendingWithdrawal />}></Route>
                            <Route exect path="fundsDManagement" element={<FundsDManagement />}></Route>
                            <Route exect path="WithdrawalFees" element={<WithdrawalFees />}></Route>
                            <Route exect path="MiscellaneousPage" element={<MiscellaneousPage />}></Route>
                            <Route exect path="notification" element={<Notification />}></Route>
                            <Route exect path="content" element={<ContentManager />}></Route>
                            <Route exect path="bannerManagement" element={<BannerManagement />}></Route>
                            <Route exect path="RejectedKyc" element={<RejectedKyc />}></Route>
                            <Route exect path="TradingCommision" element={<TradingCommision />}></Route>
                            <Route exect path="OrderBook" element={<OrderBook />}></Route>
                            <Route exect path="FundsPendingDeposit" element={<FundsPendingDeposit />}></Route>
                            <Route exect path="StakingDetails" element={<StakingDetails />}></Route>
                            <Route exect path="packageManagement" element={<PackageManagement />}></Route>
                            <Route exect path="addPackage" element={<AddPackage />}></Route>
                            <Route exect path="addform" element={<Add />}></Route>
                            <Route exect path="formlist" element={<FormList />}></Route>
                            <Route exect path="history" element={<History />}></Route>
                            <Route exect path="Broker" element={<Broker />}></Route>
                            <Route exect path="BrokerList" element={<BrokerList />}></Route>
                            <Route exect path="CoinListApplications" element={<CoinListApplications />}></Route>
                            <Route exect path="CoinListDetails/:applicationId" element={<CoinListDetails />}></Route>
                            <Route exect path="SupportRequest" element={<SupportRequest />}></Route>
                        </Route>
                        <Route exect path="/*" element={<DashboardPage />}></Route>
                    </>
                    :
                    <>
                        <Route exect path="/" element={<Loginpage />}></Route>
                        <Route exect path="/*" element={<Loginpage />}></Route>
                        <Route exect path="/forgotpassword" element={<ForgetpasswordPage />}></Route>
                    </>

                }
            </Routes>
        </Router>
    );
}

export default Routing;