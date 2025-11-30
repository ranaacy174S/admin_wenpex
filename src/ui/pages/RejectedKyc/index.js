import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";
import { CSVLink } from "react-csv";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const RejectedKyc = () => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "dateFrom":
                setDateFrom(event.target.value);
                break;
            case "dateTo":
                setDateTo(event.target.value);
                break;
            default:
        }
    }



    function imageFormatter(cell, row) {
        return <img className="table-img" src={ApiConfig?.appUrl + row?.user_selfie} alt="Selfy" />;
    }

    const columns = [
        { name: "Date", selector: row => moment(row?.createdAt).format("Do MMMM YYYY"), },
        { name: "EmailId", wrap: true, selector: row => row.emailId, },
        { name: "Pan Number", wrap: true, selector: row => row.pancard_number, },
        { name: <div style={{ whiteSpace: 'pre-wrap' }}>Document Number</div>, wrap: true, selector: row => row.document_number, },
        { name: "Selfie", selector: imageFormatter, },
        { name: "DOB", selector: row => row.dob, },
    ];


    useEffect(() => {
        handleData()
    }, []);

    const handleData = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.getdatarejectedlist().then(async result => {
            LoaderHelper.loaderStatus(false);
            if (result.success) {
                try {
                    setData(result.data.reverse());
                    setDateFrom("");
                    setDateTo("");
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }

    const handleExportData = async (dateFrom, dateTo) => {
        await AuthService.exportApprovedList(dateFrom, dateTo).then(async result => {
            if (result.data.length > 0) {
                try {
                    setData(result.data.reverse());
                } catch (error) {
                    alertErrorMessage(error);

                }
            } else {
                alertErrorMessage("No Data Found");


            }
        });
    }

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
                                        Rejected Kyc
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">Rejected Kyc List
                            {data.length === 0 ? (
                                ""
                            ) : (
                                <div className="dropdown">
                                    <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-download me-3"></i>Export</button>
                                    <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                        <CSVLink data={data} className="dropdown-item">Export as CSV</CSVLink>
                                    </div>
                                </div>)}
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
    );
};

export default RejectedKyc;