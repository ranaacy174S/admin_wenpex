import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const FundsCancelledWithdrawal = () => {
    const [fundWithdrawal, setFundWithdrawal] = useState([]);
    const [allData, setAllData] = useState([]);

    function statusFormatter(row) {
        return <span className='text-danger me-2'>{row.status}</span>
    };

    const columns = [
        { name: "Date", selector: row => moment(row?.createdAt).format("MMM Do YYYY"), },
        { name: "Email Id", wrap: true, selector: row => row.emailId, },
        { name: "Chain", selector: row => row.chain, },
        { name: "Coin Name", wrap: true, selector: row => row.short_name, },
        { name: "User Id", wrap: true, selector: row => row.user_id, },
        { name: "Withdrawal Address", wrap: true, selector: row => row.to_address, },
        { name: "Amount", wrap: true, selector: row => row.amount, },
        { name: "Status", selector: statusFormatter, },
    ];

    useEffect(() => {
        handleFundWithdrawal();
    }, []);

    const handleFundWithdrawal = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.CancelledWithdrwal().then(async (result) => {
            LoaderHelper.loaderStatus(false);
            if (result.success) {
                try {
                    setFundWithdrawal(result.data.reverse());
                    setAllData(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage("Something Went Wrong");
            }
        });
    };

    function handleSearch(e) {
        const keysToSearch = ["emailId", "chain", "short_name", "user_id", "to_address", "amount"];
        const searchTerm = e.target.value?.toLowerCase();
        const matchingObjects = allData?.reverse().filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
        setFundWithdrawal(matchingObjects);
    };
    return (
        <div id="layoutSidenav_content">
            <main>
                <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                    <div className="container-xl px-4">
                        <div className="page-header-content pt-4">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto mt-4">
                                    <h1 className="page-header-title">
                                        <div className="page-header-icon">
                                            <i className="fa fa-dollar-sign"></i>
                                        </div>
                                        Cancelled Withdrawal
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">
                           
                            <div className="col-5">
                                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={handleSearch} />
                            </div>

                            <div className="dropdown">
                                <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Export{" "}
                                </button>
                                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp" >
                                    <CSVLink data={fundWithdrawal} className="dropdown-item">
                                        Export as CSV
                                    </CSVLink>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive" width="100%">
                            <DataTableBase columns={columns} data={fundWithdrawal} />
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default FundsCancelledWithdrawal;
