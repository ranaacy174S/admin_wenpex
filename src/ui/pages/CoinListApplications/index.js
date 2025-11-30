
import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";
import { useNavigate } from "react-router-dom";

const CoinListApplications = () => {
    const navigate = useNavigate()
    const [coinListData, setcoinListData] = useState([]);
    const [allData, setAllData] = useState([]);

    const statusFormat = (row) => {
        return <span className={`text-${row.status === "Pending" ? "primary" : row.status === "Approved" ? "success" : "danger"}  me-2`}>{row.status}</span>
    };

    const rediretApplicationDetails = (id) => {
        navigate(`/dashboard/CoinListDetails/${id}`)
    };

    const columns = [
        { name: "Date", wrap: true, selector: row => moment(row?.createdAt).format("MMM Do YYYY"), },
        { name: "User Id", wrap: true, selector: row => row.user_id, },
        { name: "Email Id", wrap: true, selector: row => row.email, },
        { name: "Telegram Id", wrap: true, selector: row => row.telegramId, },
        { name: "Project Name", wrap: true, selector: row => row.projectName, },
        { name: "Coin Name", wrap: true, selector: row => row.coinName, },
        { name: "Official Website", wrap: true, selector: row => row.officialWebsite, },
        { name: "Status", wrap: true, selector: statusFormat },
        { name: "Action", wrap: true, selector: (row) => <button className='btn btn-primary btn-sm me-2' onClick={()=>rediretApplicationDetails(row?._id)}>View</button>, },
    ];

    useEffect(() => {
        handleCoinListData();
    }, []);

    const handleCoinListData = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.allCoinsListing().then(async (result) => {
            LoaderHelper.loaderStatus(false);
            if (result.success) {
                try {
                    setcoinListData(result.data.reverse());
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
        const keysToSearch = ["emailId", "chain", "short_name", "user_id", "to_address", "transaction_hash", "amount"];
        const searchTerm = e.target.value?.toLowerCase();
        const matchingObjects = allData?.reverse().filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
        setcoinListData(matchingObjects);
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
                                            <i className="fa fa-bars"></i>
                                        </div>
                                        Coin Listing Applications
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
                                <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export{" "}
                                </button>
                                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp" >
                                    <CSVLink data={coinListData} className="dropdown-item">
                                        Export as CSV
                                    </CSVLink>
                                </div>
                            </div>
                        </div>
                        <div className="card-body mt-3">
                            <div className="table-responsive" width="100%">
                                <DataTableBase columns={columns} data={coinListData} />
                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default CoinListApplications;
