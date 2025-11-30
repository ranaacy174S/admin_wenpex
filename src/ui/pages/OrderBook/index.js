import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import moment from "moment";
import { $ } from "react-jquery-plugin";
import DataTableBase from "../../../customComponent/DataTable";

const OrderBook = () => {
    const [orderBookDetails, setorderBookDetails] = useState([]);
    const [tradeDetails, settradeDetails] = useState([]);
    const [allData, setAllData] = useState([]);

    const linkFollow = (row) => {
        return (row?.filled && parseFloat(row?.filled?.toFixed(8)));
    };

    const Modal = (row) => {
        return <span className="cursor_pointer" onClick={() => { $("#Trades_modal").modal("show"); tradeById(row?._id) }}> {row?._id}</span>
    };
    const tradeById = async (id) => {
        settradeDetails([])
        LoaderHelper.loaderStatus(true);
        await AuthService.tradeById(id).then(
            async (result) => {
                if (result.success) {
                    settradeDetails(result?.data)
                    LoaderHelper.loaderStatus(false);

                } else {
                    LoaderHelper.loaderStatus(false);
                    alertErrorMessage(result.message);
                }
            }
        );
    };
    const CancelOrder = (row) => {
        return (
            <>{(row?.status !== "FILLED" && row?.status !== "CANCELLED") &&
                <div className="d-flex">
                    <button className=" btn btn-danger btn-sm" type="button" onClick={() => HandleCancelOrder(row?._id, row?.user_id)} >
                        Cancel
                    </button>
                </div>
            }
            </>
        );
    };
    const HandleCancelOrder = async (orderID, userID) => {
        LoaderHelper.loaderStatus(true)
        await AuthService.cancelOrder(orderID, userID).then(async result => {
            LoaderHelper.loaderStatus(false)
            if (result?.success) {
                HandleOrderBook();
                alertSuccessMessage(result?.message)

            } else {
                alertErrorMessage(result?.message)
            }
        })
    }
    const columns = [
        { name: "Date/Time", wrap:true, selector: row => moment(row?.updatedAt).format("DD/MM/YYYY"), },
        { name: "Order Id", wrap: true, selector: row => row._id, },
        { name: "User Id", wrap: true, selector: row => row.user_id, },
        { name: "Currency", selector: row => row.main_currency, },
        { name: "Order Type", wrap: true, selector: row => row.order_type, },
        { name: "Filled", wrap: true, selector: linkFollow, },
        { name: "Maker Fee", wrap: true, selector: row => row.maker_fee, },
        { name: "Taker Fee", wrap: true, selector: row => row.taker_fee, },
        { name: "Price", wrap: true, selector: row => row.price, },
        { name: "Remaining", wrap: true, selector: row => row.remaining, },
        { name: "Side", selector: row => row.side, },
        { name: "Status", selector: row => row.status, },
        { name: "Action", selector: CancelOrder },
    ]



    useEffect(() => {
        HandleOrderBook()
    }, []);

    const HandleOrderBook = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.OrderBook().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setorderBookDetails(result?.data.reverse());
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
        const keysToSearch = ["_id","user_id", "main_currency", "order_type", "status", "side"];
        const searchTerm = e.target.value?.toLowerCase();
        const matchingObjects = allData?.reverse().filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
        setorderBookDetails(matchingObjects);
    };

    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i className="far fa-user"></i></div>
                                            OrderBook
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
                                        <CSVLink data={orderBookDetails} className="dropdown-item">Export as CSV</CSVLink>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive" width="100%">
                                <DataTableBase columns={columns} data={orderBookDetails} />
                            </div>


                        </div>
                    </div>
                </main>
            </div>
            <div
                className="modal"
                id="Trades_modal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="Trades_modal_modalTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog  alert_modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">
                                Trade Details
                            </h5>
                            <button
                                className="btn-close"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {tradeDetails.length > 0 ? tradeDetails?.map((item, index) => {
                                return (
                                    <>
                                        <div className="form-group position-relative ">
                                            <label className="small">Currency: {item?.currency} </label>
                                        </div>
                                        <div className="form-group   position-relative ">
                                            <label className="small ">Price: {item?.price} </label>
                                        </div>
                                        <div className="form-group position-relative ">
                                            <label className="small mb-1">Quantity: {item?.quantity} </label>
                                        </div>
                                        <hr />
                                    </>
                                )
                            }) : 'No Data Found'}


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderBook;