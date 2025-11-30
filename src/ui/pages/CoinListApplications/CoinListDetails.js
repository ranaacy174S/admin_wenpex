import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { useNavigate, useParams } from "react-router-dom";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";

const CoinListDetails = () => {
    const navigate = useNavigate()
    const { applicationId } = useParams()
    const [coinDetails, setCoinDetails] = useState({});
    const [image, setImage] = useState("");

    const handleDetails = async () => {
        try {
            LoaderHelper.loaderStatus(true);
            const result = await AuthService.single_coin_listing(applicationId)
            LoaderHelper.loaderStatus(false);
            if (result?.success) setCoinDetails(result?.data[0]);
        } catch { LoaderHelper.loaderStatus(false); alertErrorMessage("Something Went Wrong"); }
    };

    const handleStatus = async (status) => {
        try {
            LoaderHelper.loaderStatus(true);
            const result = await AuthService.update_coin_listing_status(status, applicationId)
            LoaderHelper.loaderStatus(false);
            if (result?.success) {
                alertSuccessMessage(result?.message);
                handleDetails();
            } else alertErrorMessage(result?.message);
        } catch { LoaderHelper.loaderStatus(false); alertErrorMessage("Something Went Wrong"); }
    };


    useEffect(() => {
        handleDetails();
    }, []);

    return (
        <div id="layoutSidenav_content">
            <main>
                <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                    <div className="container-xl px-4">
                        <div className="page-header-content pt-4">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto mt-4">
                                    <h1 className="page-header-title">
                                        <div className="page-header-icon cursor-pointer" onClick={() => navigate(-1)}>
                                            <i className="fa fa-arrow-left"></i>
                                        </div>
                                        Appilcation Details
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-body mt-3">
                            <div className="table-responsive" width="100%">
                                <div className="card-header">Application Details</div>
                                <div className="card-body" >
                                    <div className="profile_data py-4 px-4" >
                                        <div className="row" > <span className="col-3" >Status</span> <strong className=" col">
                                            {coinDetails?.status === "Pending" ? <>
                                                <button className='btn btn-success btn-sm me-2' onClick={() => handleStatus("Approved")} >Approve</button>
                                                <button className='btn btn-danger btn-sm me-2' onClick={() => handleStatus("Rejected")}>Reject</button></> :
                                                <span className={`text-${coinDetails.status === "Approved" ? "success" : "danger"}  me-2`}>{coinDetails.status}</span>
                                            }

                                        </strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Submitted Date</span> <strong className=" col">{moment(coinDetails?.createdAt).format('Do MMMM YYYY')}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Email:</span> <strong className=" col">{coinDetails?.email}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Your Telegram ID:</span> <strong className=" col">{coinDetails?.telegramId}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Please entail the proof of concept behind the coin/token: </span> <strong className=" col">{coinDetails?.proofOfConcept}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Please address the problem statement being solved:</span> <strong className=" col">{coinDetails?.problemStatement}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >What is the vision for the project?</span> <strong className=" col">{coinDetails?.vision}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Are there active users of the project?</span> <strong className=" col">{coinDetails?.activeUsers}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" > Is the underlying technology decentralized or is there a roadmap for the same?</span> <strong className=" col">{coinDetails?.roadmap}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" > Does the project benefit from using blockchain technology?</span> <strong className=" col">{coinDetails?.benefit}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Project Name:</span> <strong className=" col">{coinDetails?.projectName}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" > Token/Coin Ticker:</span> <strong className=" col">{coinDetails?.coinName}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Project Official Website:</span> <strong className=" col">{coinDetails?.officialWebsite}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" > What is the nature of the Project?</span> <strong className=" col">{coinDetails?.projectNature}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Have you been in discussion with other CEXs regarding listings, please specify:</span> <strong className=" col">{coinDetails?.discussionWithOther}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Target timeline for listing:</span> <strong className=" col">{coinDetails?.timeline}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Referred by (CTEX officials, if no please input "No"):</span> <strong className=" col">{coinDetails?.isReferred}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >If you are working with any third-party listing agent, please specify:</span> <strong className=" col">{coinDetails?.thirdPartyWorking}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >If you are working with any liquidity service providers (market makers), please specify:</span> <strong className=" col">{coinDetails?.liquidityServiceWorking}</strong></div>
                                        <hr className="my-3" />
                                        <div className="row" > <span className="col-3" >Anything else:</span> <strong className=" col">{coinDetails?.anythingElse}</strong></div>
                                        <hr className="my-3" />

                                        <div className="row">
                                            <span className="mb-4 col-12" >Attachments:</span>
                                            <div className="col-6  mb-3">
                                                <div className="doc_img">
                                                    <div className="row mb-3">
                                                        <div className="col">Collection Form</div>
                                                    </div>
                                                    <div className="ratio ratio-16x9">
                                                        {coinDetails?.collectionForm?.includes("pdf") ?
                                                            <a href={`${ApiConfig.appUrl}${coinDetails?.collectionForm}`} target="_blank" rel="noreferrer" className="text-center">  <img src="/assets/img/pdf.png" alt="" className="w-50 cursor_pointer" /></a>
                                                            :
                                                            <img src={`${ApiConfig.appUrl}${coinDetails?.collectionForm}`} alt="" className="w-100 cursor_pointer" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => setImage(`${ApiConfig.appUrl}${coinDetails?.collectionForm}`)} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6  mb-3">
                                                <div className="doc_img">
                                                    <div className="row mb-3">
                                                        <div className="col">Registration Document</div>
                                                    </div>
                                                    <div className="ratio ratio-16x9">
                                                        {coinDetails?.registrationDocument?.includes("pdf") ?
                                                            <a href={`${ApiConfig.appUrl}${coinDetails?.registrationDocument}`} target="_blank" rel="noreferrer" className="text-center">  <img src="/assets/img/pdf.png" alt="" className="w-50 cursor_pointer" /></a>
                                                            :
                                                            <img src={`${ApiConfig.appUrl}${coinDetails?.registrationDocument}`} alt="" className="w-100 cursor_pointer" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => setImage(`${ApiConfig.appUrl}${coinDetails?.registrationDocument}`)} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6  mb-3">
                                                <div className="doc_img">
                                                    <div className="row mb-3">
                                                        <div className="col">WhitePaper</div>
                                                    </div>
                                                    <div className="ratio ratio-16x9">
                                                        {coinDetails?.whitePaper?.includes("pdf") ?
                                                            <a href={`${ApiConfig.appUrl}${coinDetails?.whitePaper}`} target="_blank" rel="noreferrer" className="text-center">  <img src="/assets/img/pdf.png" alt="" className="w-50 cursor_pointer" /></a>
                                                            :
                                                            <img src={`${ApiConfig.appUrl}${coinDetails?.whitePaper}`} alt="" className="w-100 cursor_pointer" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => setImage(`${ApiConfig.appUrl}${coinDetails?.whitePaper}`)} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6  mb-3">
                                                <div className="doc_img">
                                                    <div className="row mb-3">
                                                        <div className="col">Legal Opinion</div>
                                                    </div>
                                                    <div className="ratio ratio-16x9">
                                                        {coinDetails?.legalOpinion?.includes("pdf") ?
                                                            <a href={`${ApiConfig.appUrl}${coinDetails?.legalOpinion}`} target="_blank" rel="noreferrer" className="text-center">  <img src="/assets/img/pdf.png" alt="" className="w-50 cursor_pointer" /></a>
                                                            :
                                                            <img src={`${ApiConfig.appUrl}${coinDetails?.legalOpinion}`} alt="" className="w-100 cursor_pointer" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => setImage(`${ApiConfig.appUrl}${coinDetails?.legalOpinion}`)} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6  mb-3">
                                                <div className="doc_img">
                                                    <div className="row mb-3">
                                                        <div className="col">NDA Form</div>
                                                    </div>
                                                    <div className="ratio ratio-16x9">
                                                        {coinDetails?.ndaForm?.includes("pdf") ?
                                                            <a href={`${ApiConfig.appUrl}${coinDetails?.ndaForm}`} target="_blank" rel="noreferrer" className="text-center">  <img src="/assets/img/pdf.png" alt="" className="w-50 cursor_pointer" /></a>
                                                            :
                                                            <img src={`${ApiConfig.appUrl}${coinDetails?.ndaForm}`} alt="" className="w-100 cursor_pointer" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => setImage(`${ApiConfig.appUrl}${coinDetails?.ndaForm}`)} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6  mb-3">
                                                <div className="doc_img">
                                                    <div className="row mb-3">
                                                        <div className="col">Audit Report</div>
                                                    </div>
                                                    <div className="ratio ratio-16x9">
                                                        {coinDetails?.auditReport?.includes("pdf") ?
                                                            <a href={`${ApiConfig.appUrl}${coinDetails?.auditReport}`} target="_blank" rel="noreferrer" className="text-center">  <img src="/assets/img/pdf.png" alt="" className="w-50 cursor_pointer" /></a>
                                                            :
                                                            <img src={`${ApiConfig.appUrl}${coinDetails?.auditReport}`} alt="" className="w-100 cursor_pointer" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => setImage(`${ApiConfig.appUrl}${coinDetails?.auditReport}`)} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6  mb-3">
                                                <div className="doc_img">
                                                    <div className="row mb-3">
                                                        <div className="col">KYC Info</div>
                                                    </div>
                                                    <div className="ratio ratio-16x9">
                                                        {coinDetails?.kycInfo?.includes("pdf") ?
                                                            <a href={`${ApiConfig.appUrl}${coinDetails?.kycInfo}`} target="_blank" rel="noreferrer" className="text-center">  <img src="/assets/img/pdf.png" alt="" className="w-50 cursor_pointer" /></a>
                                                            :
                                                            <img src={`${ApiConfig.appUrl}${coinDetails?.kycInfo}`} alt="" className="w-100 cursor_pointer" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => setImage(`${ApiConfig.appUrl}${coinDetails?.kycInfo}`)} />}
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
            <div className="modal image_modal" id="edit_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog  alert_modal modal-lg" role="document">
                    <div className="modal-content">
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="ratio ratio-16x9">
                            <img src={image} className="w-100 cc_modal_img" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinListDetails;
