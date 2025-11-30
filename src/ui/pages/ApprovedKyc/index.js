import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";
import { CSVLink } from "react-csv";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const ApprovedKyc = () => {
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);

    function imageFormatter(row) {
        return <img className="table-img" src={ApiConfig?.appUrl + row?.user_selfie} alt="Selfy" />;
    };

    const columns = [
        { name: "Date", selector: row => moment(row?.createdAt).format("Do MMMM YYYY") },
        { name: "Email", wrap: true, selector: row => row.emailId, },
        { name: <div style={{ whiteSpace: 'wrap' }}>Document Number</div>, wrap: true, selector: row => row.document_number, },
        { name: "Pan Number", wrap: true, selector: row => row.pancard_number, },
        { name: "Selfie", selector: imageFormatter, },
        { name: "DOB", selector: row => row.dob, },
    ]

    useEffect(() => {
        handleData()
    }, []);

    const handleData = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.getdataverifylist().then(async result => {
            LoaderHelper.loaderStatus(false);
            if (result.data) {
                try {
                    setData(result.data.reverse());
                    setAllData(result.data);
                } catch (error) {
                    alertErrorMessage('No data found');
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage('No data found');
            }
        });
    }

    function searchObjects(e) {
        const keysToSearch = ["firstName", "_id", "emailId", "pancard_number", "dob"];
        const searchTerm = e.target.value?.toLowerCase();
        const matchingObjects = allData.filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
        setData(matchingObjects);
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
                                        <div className="page-header-icon"> <i className="fa fa-user-check" ></i></div>
                                        Approved Kyc
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
                                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={searchObjects} />
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-download me-3"></i>Export</button>
                                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                    <CSVLink data={data} className="dropdown-item">Export as CSV</CSVLink>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive" width="100%">
                                <DataTableBase columns={columns} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ApprovedKyc;