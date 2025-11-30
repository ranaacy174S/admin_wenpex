import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import { $ } from 'react-jquery-plugin';
import moment from "moment";
import Select from "react-select";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const SubAdmin = () => {
    const [subAdminList, setSubAdminList] = useState([]);
    const [allData, setAllData] = useState([]);
    const [subadminId, setSubadminId] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [multipleSelectd, setMultipleSelectd] = useState([]);
    const [adminType, setadminType] = useState();
    const [showModal, setshowModal] = useState(false);

    const linkFollow = (row) => {
        return (
            <>
                <button className="btn btn-dark btn-sm me-2" data-bs-toggle="modal" data-bs-target="#edit_modal" onClick={() => handleSubadminDetail(row)}>Edit</button>
                <button className="btn btn-danger  btn-sm" onClick={() => deleteSubAdmin(row?._id)}>Delete</button>
            </>
        );
    };

    const statuslinkFollow = (row) => {
        return (
            <button className={row?.status === "Active" ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"} style={{ marginLeft: "20px" }} onClick={() => handleStatus(row?._id, row?.status === "Inactive" ? "Active" : "Inactive")}>{row?.status === "Inactive" ? "Inactive" : "Active"}</button>
        );
    };

    const handleStatus = async (userId, cell) => {
        await AuthService.handleSubadminStatus2(userId, cell).then(async result => {
            if (result.success) {
                alertSuccessMessage(result.message);
                handleSubadmin();
            } else {
                alertErrorMessage(result.message)
            }
        })
    }

    const handleSubadminDetail = (id) => {
        setshowModal(true)
        setFirstName(id.first_name);
        setLastName(id.last_name);
        setEmail(id.email_or_phone);
        setGender(id.gender);
        setMultipleSelectd(id.permissions);
        setSubadminId(id._id);
        setadminType(id.admin_type);
    };

    const handleSubadmin = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.getSubAdminList().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setSubAdminList(result.data.reverse());
                    setAllData(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
            }
        });
    }

    function searchObjects(e) {
        const keysToSearch = ["first_name", "email_or_phone"];
        const userInput = e.target.value;
        const searchTerm = userInput?.toLowerCase();
        const matchingObjects = allData?.filter(obj => {
            return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm));
        });
        setSubAdminList(matchingObjects);
    };

    const deleteSubAdmin = async (userId) => {
        await AuthService.deleteSubAdminList(userId).then(async result => {
            if (result.success) {
                alertSuccessMessage("Delete Successfully");
                handleSubadmin()
            } else {
                alertErrorMessage(result.message)
            }
        })
    }

    const resetEditInput = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setGender("");
    }

    const handleUpdateSubadminList = async (firstName, lastName, email, gender, subadminId, multipleSelectd, adminType) => {
        await AuthService.updateSubadminList(firstName, lastName, email, gender, subadminId, multipleSelectd, adminType).then(async result => {
            if (result?.success) {
                try {
                    alertSuccessMessage("Subadmin Updated Successfully!!");
                    setshowModal(false)
                    $('#edit_modal').modal('hide');
                    resetEditInput();
                    handleSubadmin();
                } catch (error) {

                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    };

    const columns = [
        { name: 'Name', compact: true, selector: row => row?.first_name + " " + row?.last_name },
        { name: 'Email', sort: true, selector: row => row?.email_or_phone, wrap: true },
        { name: 'Registration Date', sort: true, selector: row => moment(row?.createdAt).format('MMMM Do YYYY') },
        { name: 'Status', sort: true, selector: statuslinkFollow },
        { name: 'Action', selector: linkFollow },
    ]

    var multipleSelect = [
        { value: 1, label: 'Traders' },
        { value: 2, label: 'KYC Manager' },
        { value: 3, label: 'Currency Management' },
        { value: 4, label: 'Exchange Wallet Management' },
        { value: 5, label: 'Currency Pair Management' },
        { value: 6, label: "Exchange Profit" },
        { value: 7, label: "Funds Management" },
        { value: 8, label: 'Market Trades' },
        { value: 9, label: 'OrderBook' },
        { value: 10, label: 'Notification' },
        { value: 11, label: 'Staking' },
        { value: 12, label: 'Launchpad' },
    ];

    useEffect(() => {
        handleSubadmin()
    }, []);


    return (
        <>
            <div id="layoutSidenav_content">
                <main style={{ display: showModal ? 'none' : '' }}>
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i className="far fa-user"></i></div>
                                            Sub Admin List
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between">
                                <div className="col-5">
                                    <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={searchObjects} />
                                </div>
                                {subAdminList.length === 0 ? "" :
                                    <div className="dropdown">
                                        <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export </button>
                                        <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                            <CSVLink data={subAdminList} className="dropdown-item">Export as CSV</CSVLink>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="card-body mt-3">
                                {subAdminList.length === 0 ? <h6 className="ifnoData"><img alt="" src="assets/img/no-data.png" /> <br />No Data Available</h6> :
                                    <div className="table-responsive" width="100%">
                                        <DataTableBase columns={columns} data={subAdminList} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* sub admin edit Pair modal data */}
            <div className="modal-content" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">
                        Edit Sub Admin Details
                    </h5>
                    <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setshowModal(false) }}> </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-4">
                                <label className="small mb-1" for="inputFirstName">First name <em>*</em></label>
                                <input className="form-control  form-control-solid" id="inputFirstName" type="text" placeholder="Enter your first name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label className="small mb-1" for="inputLastNames">Last name <em>*</em> </label>
                                <input className="form-control form-control-solid" id="inputLastNames" type="text" placeholder="Enter your last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            </div>

                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputEmailAddress">Email</label>
                                <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6" >
                                <label className="small mb-1" for="inputLocation">Permissions</label>
                                <Select isMulti options={multipleSelect}
                                    onChange={setMultipleSelectd}
                                    value={multipleSelectd}
                                >
                                </Select>
                            </div>
                        </div>
                        <button className="btn btn-indigo" type="button" onClick={() => handleUpdateSubadminList(firstName, lastName, email, gender, subadminId, multipleSelectd, adminType)}> Submit Details </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SubAdmin;