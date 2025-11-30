import React, { useState, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";
import { CSVLink } from "react-csv";
import DataTableBase from "../../../customComponent/DataTable";

const BannerManagement = () => {
    const [bannerFile, setBannerFile] = useState('');
    const [bannerList, setBannerList] = useState('');

    const handleChangeIdentity = async (event) => {
        event.preventDefault();
        const fileUploaded = event.target.files[0];
        setBannerFile(fileUploaded);
    };

    const resetInputChange = () => {
        setBannerFile("")
        document.getElementById("bannerImg").value = "";
    };

    const handleAddBanner = async (bannerFile) => {
        var formData = new FormData();
        formData.append('banner_type', "INVITE");
        formData.append('banner_sequence', 1);
        formData.append('banner_image', bannerFile);
        await AuthService.AddBanner(formData).then(async result => {
            if (result.success) {
                try {
                    alertSuccessMessage(result.message);
                    resetInputChange();
                    handleBanners();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                const errorMessage = result.message;
                alertErrorMessage(errorMessage);
            };
        });
    };

    const linkFollow = (row) => {
        return <div><button className="btn btn-danger btn-sm" type="button" onClick={() => deleteBanner(row?._id)}>Delete</button></div>
    };

    const statuslinkFollow = (row) => {
        return <button type="button" className={row?.status === "Active" ? "btn btn-sm btn-primary" : "btn btn-sm btn-danger"} style={{ marginLeft: "20px" }} onClick={() => handleStatus(row?._id, row?.status === "Active" ? "Inactive" : "Active")}>{row?.status}</button>
    };

    function imageFormatter(cell, row) {
        return (
            <a href={ApiConfig?.appUrl + cell?.banner_path} target="_blank" rel="noreferrer" > <img width='150px' height='100px' src={ApiConfig?.appUrl + cell?.banner_path} alt="Banner Img" />
            </a>
        );
    };

    const columns = [
        { name: "Banner Image", shrink: true, selector: imageFormatter, },
        { name: "Status", shrink: true, selector: statuslinkFollow, },
        { name: "Action", selector: linkFollow, },
    ];

    const handleBanners = async () => {
        LoaderHelper.loaderStatus(false);
        await AuthService.getBannerList().then(async result => {
            if (result.data) {
                LoaderHelper.loaderStatus(false);
                try {
                    setBannerList(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage("No data found");

            };
        });
    };

    const deleteBanner = async (userId) => {
        await AuthService.deletebannerlist(userId).then(async result => {
            if (result.success) {
                alertSuccessMessage(result.message);
                handleBanners();
            } else {
                alertErrorMessage(result.message)
            };
        });
    };

    const handleStatus = async (userId, cell) => {
        await AuthService.handleBannerStatus(userId, cell).then(async result => {
            if (result?.success) {
                alertSuccessMessage(result?.message)
                handleBanners();
            } else {
                alertErrorMessage(result.message)
            };
        });
    };

    useEffect(() => {
        handleBanners();
    }, []);

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
                                            <div className="page-header-icon"><i className="fa fa-image"></i></div>
                                            Banner Manangment
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="row" >
                            <div className="col-xl-4">
                                <div className="card mb-4 mb-xl-0">
                                    <div className="card-body d-flex justify-content-center flex-column p-5 ">
                                        <div className="d-flex align-items-center justify-content-start mb-4 ">
                                            <h5 className="mb-0" >Add New Banner</h5>
                                        </div>
                                        <form>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Banner Image <small className="text-dark ms-1" >(600X400)</small> </label>
                                                <input className="form-control  form-control-solid" id="bannerImg" type="file" name="bannerFile" onChange={handleChangeIdentity}></input>
                                            </div>
                                            <button className="btn btn-indigo   btn-block w-100 mt-2" type="button" onClick={() => handleAddBanner(bannerFile)} disabled={!bannerFile}> Submit </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8" >
                                <div className="card">
                                    <div className="card-header">
                                        Banners List
                                        <div className="dropdown">
                                            <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Export{" "}
                                            </button>
                                            <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                                <CSVLink data={bannerList} className="dropdown-item">Export as CSV</CSVLink>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body" >
                                        <form className="row" >
                                            <div className="col-12" >
                                                <div className="table-responsive" >
                                                    <DataTableBase columns={columns} data={bannerList} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


        </>
    )
}

export default BannerManagement;