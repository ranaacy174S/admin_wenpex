import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import moment from "moment";
import DataTableBase from "../../../customComponent/DataTable";

const TradingReport = () => {
    const [tradingReport, setTradingReport] = useState([]);
    const [allData, setAllData] = useState([]);
    const columns = [
        { name: "Date/Time", selector: row => moment(row?.updatedAt).format("DD/MM/YYYY"), },
        { name: "Order Id", wrap: true, selector: row => row.order_id, },
        { name: "Currency", selector: row => row.main_currency, },
        { name: "Order Type", selector: row => row.order_type, },
        { name: "Fee", wrap: true, selector: row => parseFloat(row?.fee?.toFixed(8)) },
        { name: "Price", wrap: true, selector: row => row.price, },
        { name: "Quantity", wrap: true, selector: row => parseFloat(row?.quantity?.toFixed(8)), },
        { name: "Side", selector: row => row.side, },
        { name: "TDS", wrap: true, selector: row => row.tds, },
    ];

    useEffect(() => {
        handleTradingReport()
    }, []);

    const handleTradingReport = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.tradeHistory().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setTradingReport(result?.data.reverse());
                    setAllData(result?.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
            }
        });
    };
    function handleSearch(e) {
        const keysToSearch = ["order_id", "main_currency", "order_type", "fee", "price", "quantity"];
        const searchTerm = e.target.value?.toLowerCase();
        const matchingObjects = allData?.reverse().filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
        setTradingReport(matchingObjects);
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
                                        <div className="page-header-icon"><i className="far fa-user"></i></div>
                                        Trading History
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
                                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                    <CSVLink data={tradingReport} className="dropdown-item">Export as CSV</CSVLink>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive" width="100%">
                            <DataTableBase columns={columns} data={tradingReport} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default TradingReport;