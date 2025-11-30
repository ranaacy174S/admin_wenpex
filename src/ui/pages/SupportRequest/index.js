import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import moment from "moment";
import DataTableBase from "../../../customComponent/DataTable";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";

const SupportRequest = () => {
    const [supoortRequest, setSupoortRequest] = useState([]);
    const [allData, setAllData] = useState([]);

    function imageFormatter(row) {
        return <a href={`${ApiConfig.appUrl}${row?.path}`} target="_blank" rel="noReferrer"> <img width="200px" src={`${ApiConfig.appUrl}${row?.path}`}/></a>
    };

    const columns = [
        { name: "Date", selector: row => moment(row?.createdAt).format("MMM Do YYYY"), },
        { name: "Ticket ID", wrap:true, selector: row => row._id, },
        { name: "Name", selector: row => row.name, },
        { name: "Email", wrap: true, selector: row => row.email, },
        { name: "Subject", wrap: true, selector: row => row.subject, },
        { name: "Details", wrap: true, selector: row => row.details, },
        { name: "Attachement", selector: imageFormatter, },
    ];

    useEffect(() => {
        getSupportRequest()
    }, []);

    const getSupportRequest = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.get_supports().then(async result => {
            LoaderHelper.loaderStatus(false);
            if (result?.success) {
                try {
                    setSupoortRequest(result.data?.reverse());
                    setAllData(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
            }
        });
    };

    function searchObjects(e) {
        const keysToSearch = ["email", "_id", "name",];
        const searchTerm = e.target.value?.toLowerCase()?.trim();
        const matchingObjects = allData?.reverse().filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
        setSupoortRequest(matchingObjects?.reverse());
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
                                        <div className="page-header-icon"><i className="fa fa-dollar-sign"></i></div>
                                        Support Request
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
                                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search Ticket ID, Email or Name" name="search" onChange={searchObjects} />
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Export{" "}
                                </button>
                                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                    <CSVLink data={supoortRequest} className="dropdown-item">Export as CSV</CSVLink>
                                </div>
                            </div>
                        </div>
                        <div className="card-body mt-3">
                            <div className="table-responsive" width="100%">
                                <DataTableBase columns={columns} data={supoortRequest} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SupportRequest;