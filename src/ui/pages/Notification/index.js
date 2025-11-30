import React, { useState, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const Notification = () => {
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notification, setNotification] = useState([{ description: '' }]);
    const [notificationLink, setNotificationLink] = useState([{ Title: '', Link: '' }]);
    const [notificationList, setNotificationList] = useState([]);

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "notificationTitle":
                setNotificationTitle(event.target.value);
                break;
            case "notification":
                setNotification(event.target.value);
                break;
            default:
        }
    }
    const AddLink = () => {
        setNotificationLink([...notificationLink, { Title: '', Link: '' }])
    }
    const AddDescription = () => {
        setNotification([...notification, { description: '' }])
    }

    const DeleteLink = (data) => {
        let filteredData = notificationLink?.filter((item) => {
            return item !== data
        })
        setNotificationLink(filteredData)
    }
    const DeleteDesc = (data) => {
        let filteredData = notification?.filter((item) => {
            return item !== data
        })
        setNotification(filteredData)
    }

    const HandleLinkInput = (index, e, selected) => {
        let temp = [...notificationLink];
        temp[index][selected] = e.target.value;
        setNotificationLink(temp);
    }
    const HandleDescriptionInput = (index, e, selected) => {
        let temp = [...notification];
        temp[index][selected] = e.target.value;
        setNotification(temp);
    }

    const resetInputChange = () => {
        setNotificationTitle("");
        setNotification([{ description: '' }]);
        setNotificationLink([{ Title: '', Link: '' }]);
    }

    const handleNotify = async (notificationTitle, notification, notificationLink) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.addNotify(notificationTitle, notification, notificationLink).then(async result => {
            if (result?.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    resetInputChange();
                    handleNotification();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        })
    }
    const linkFollow = (row) => {
        return (
            <>
                <button className="btn btn-danger btn-sm" type="button" onClick={() => DeleteNotification(row?._id)}>Delete</button>
            </>
        );
    };
    const HandleLink = (row) => {
        return (
            <>
                {row?.link[0]?.Title  ? row?.link?.map((item) => {
                    return (
                        <>Title:{item?.Title}<br />Link:{item?.Link} <hr /></>
                    )
                }) : '---'}
            </>
        );
    };
    const HandleDecription = (row) => {
        return (
            <>
                {row?.message?.length > 0 ? row?.message?.map((item) => {
                    return (
                        <>{item?.description}<hr /></>
                    )
                }) : '---'}
            </>
        );
    };
    const columns = [
        { name: "Notification Title", shrink: true, wrap: true, selector: row => row.title, },
        { name: "Notification", shrink: true, wrap: true, selector: HandleDecription, },
        { name: "Attached Link", wrap: true, selector: HandleLink, },
        { name: "Action", selector: linkFollow, },
    ];


    useEffect(() => {
        handleNotification()
    }, []);

    const handleNotification = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.getNotificationList().then(async result => {
            if (result?.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setNotificationList(result?.data?.reverse());
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage("Something Went Wrong");
            }
        });
    }
    const DeleteNotification = async (id) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.deleteNotify(id).then(async result => {
            if (result?.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result?.message)
                    handleNotification()
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage("Something Went Wrong");
            }
        });
    }
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
                                            <div className="page-header-icon"><i className="fa fa-bell"></i></div>
                                            Notifications
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
                                            <h5 className="mb-0" >Send Notification</h5>
                                        </div>
                                        <form>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1"> Notification Title </label>
                                                <input className="form-control  form-control-solid" type="text" placeholder="Enter Title" name="notificationTitle" value={notificationTitle} onChange={handleInputChange}></input>
                                            </div>

                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1"> Notification </label>
                                                {notification?.map((item, index) => {
                                                    return (<>
                                                        <div className="row mb-3">
                                                            <div className="col-xl-8">
                                                                <textarea className="form-control form-control-solid" rows={3} name="description" value={item?.description} onChange={(e) => { HandleDescriptionInput(index, e, 'description') }}></textarea>
                                                            </div>
                                                            <div className="col-xl-4">
                                                                <button className="btn btn-danger   btn-block w-100 mt-2" type="button" disabled={index === 0} onClick={() => { DeleteDesc(item) }} > Delete Desc</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    )
                                                })}
                                                <button className="btn btn-success   btn-block w-100 mt-2" type="button" onClick={() => AddDescription()} > Add Desciption</button>

                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1"> Notification Link (optional) </label>
                                                {notificationLink?.map((item, index) => {
                                                    return (<>
                                                        <div className="row mb-3">
                                                            <div className="col-xl-8">
                                                                <input className="form-control  form-control-solid" type="text" placeholder="Title" name="notificationtitle" value={item?.Title} onChange={(e) => { HandleLinkInput(index, e, 'Title') }}></input>
                                                                <input className="form-control  form-control-solid" type="text" placeholder="Link" name="notificationlink" value={item?.Link} onChange={(e) => { HandleLinkInput(index, e, 'Link') }}></input>
                                                            </div>
                                                            <div className="col-xl-4">
                                                                <button className="btn btn-danger   btn-block w-100 mt-2" type="button" disabled={index === 0} onClick={() => { DeleteLink(item) }} > Delete Link</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    )
                                                })}
                                                <button className="btn btn-success   btn-block w-100 mt-2" type="button" onClick={() => AddLink()} > Add Link</button>
                                            </div>
                                            <button className="btn btn-indigo   btn-block w-100 mt-2" type="button" onClick={() => handleNotify(notificationTitle, notification, notificationLink)} disabled={!notificationTitle} > Send Notification </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8" >
                                <div className="card">
                                    <div className="card-header">Notification List
                                        {notificationList.length === 0 ? "" :
                                            <div className="dropdown">
                                                <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export</button>
                                                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                                    <CSVLink data={notificationList} className="dropdown-item">Export as CSV</CSVLink>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="card-body" >
                                        <form className="row" >
                                            <div className="col-12" >
                                                <div className="table-responsive" >
                                                    <DataTableBase columns={columns} data={notificationList} />
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

export default Notification;