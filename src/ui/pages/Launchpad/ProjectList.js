import React, { useEffect, useState } from 'react'
import DataTableBase from '../../../customComponent/DataTable'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../../api/services/AuthService';
import { alertErrorMessage, alertSuccessMessage, alertWarningMessage } from '../../../customComponent/CustomAlertMessage';
import LoaderHelper from '../../../customComponent/Loading/LoaderHelper';
import moment from 'moment';
import { $ } from 'react-jquery-plugin';


const FormList = () => {
    const [launchpad_images, setlaunchpad_images] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectSymbol, setProjectSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');
    const [tokenPrice, setTokenPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tokenContractAddress, setTokenContractAddress] = useState('');
    const [adminAddress, setAdminAddress] = useState('');
    const [status, setStatus] = useState('Live');
    const [userID, setuserID] = useState('');
    const [getFormData, setGetFormData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    const getAllProject = async () => {
        try {
            LoaderHelper.loaderStatus(true);
            const result = await AuthService.getAllProject()
            LoaderHelper.loaderStatus(false);
            if (result.success) setGetFormData(result?.data)
        } catch (error) {
            LoaderHelper.loaderStatus(false);
            alertErrorMessage(error.message);
        }
    };

    const resetInputChange = () => {
        setlaunchpad_images('');
        setProjectName('');
        setProjectDescription('');
        setProjectSymbol('');
        setTotalSupply('');
        setTokenPrice('');
        setStartDate('');
        setEndDate('');
        setTokenContractAddress('');
        setAdminAddress('');
        setStatus('');
    };

    const handleEditForm = async (userID, launchpad_images, projectName, projectDescription, projectSymbol, totalSupply, tokenPrice, startDate, endDate, tokenContractAddress, status) => {
        LoaderHelper.loaderStatus(true);
        const updateFormData = new FormData();
        updateFormData.append('launchpad_images', launchpad_images);
        updateFormData.append('projectName', projectName);
        updateFormData.append('projectDescription', projectDescription);
        updateFormData.append('projectSymbol', projectSymbol);
        updateFormData.append('totalSupply', totalSupply);
        updateFormData.append('tokenPrice', tokenPrice);
        updateFormData.append('startDate', startDate);
        updateFormData.append('endDate', endDate);
        updateFormData.append('tokenContractAddress', tokenContractAddress);
        updateFormData.append('status', status);
        await AuthService.updateProject(userID, updateFormData).then(async (result) => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage('Updated Successfully');
                    getAllProject();
                    resetInputChange();
                    $("#edit_banner").modal("hide");
                } catch (error) {
                    alertWarningMessage(result.message);
                };
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            };
        });
    };

    const handleEditInput = async (e) => {
        switch (e.target.name) {
            case 'launchpad_images':
                setlaunchpad_images(e.target.files[0]);
                break;
            case 'projectName':
                setProjectName(e.target.value);
                break;
            case 'projectDescription':
                setProjectDescription(e.target.value);
                break;
            case 'projectSymbol':
                setProjectSymbol(e.target.value);
                break;
            case 'totalSupply':
                setTotalSupply(e.target.value);
                break;
            case 'tokenPrice':
                setTokenPrice(e.target.value);
                break;
            case 'startDate':
                setStartDate(e.target.value);
                break;
            case 'endDate':
                setEndDate(e.target.value);
                break;
            case 'tokenContractAddress':
                setTokenContractAddress(e.target.value);
                break;
            case 'adminAddress':
                setAdminAddress(e.target.value);
                break;
            case 'status':
                setStatus(e.target.value);
                break;

            default:
                break;
        };
    };

    const deleteForm = async (userID) => {
        try {
            const result = await AuthService.deleteProject(userID)
            if (result.success) {
                alertSuccessMessage('Deleted Successfully');
                getAllProject();
            } else {
                alertErrorMessage(result.message)
            };
        } catch (error) {
            alertErrorMessage(error.message)
        }
    };

    const viewCommitData = (projectId) => {
        navigate('/dashboard/history', { state: projectId })
    };
    const convertDateFormat = (dateString) => {
        const [datePart, timePart] = dateString.split('T');
        const [hours, minutes] = timePart.split(':');
        return `${datePart}T${hours}:${minutes}`;
      };

    const handleEditModal = (row) => {
        setuserID(row?._id);
        setProjectName(row?.projectName);
        setProjectDescription(row?.projectDescription);
        setProjectSymbol(row?.projectSymbol);
        setTotalSupply(row?.totalSupply);
        setTokenPrice(row?.tokenPrice);
        setTokenContractAddress(row?.tokenContractAddress);
        setAdminAddress(row?.adminAddress);
        setStatus(row?.status)
        setEndDate(convertDateFormat(row?.endDate));
        setStartDate(convertDateFormat(row?.startDate));
    };

    const handleActionButtons = (row) => <div className='d-flex '>
        <button type='button' className='btn btn-sm btn-info ' data-bs-toggle="modal" data-bs-target="#edit_banner" onClick={() => handleEditModal(row)} ><i class="far fa-edit"></i></button>
        <button type='button' className='btn btn-sm btn-danger mx-1' onClick={() => deleteForm(row?._id)}><i class="far fa-trash-alt"></i></button>
        <button type='button' className='btn btn-sm btn-secondary w-100' onClick={() => viewCommitData(row?._id)}><i class="far fa-eye"></i></button>
    </div>;

    const columns = [
        { name: 'Created At', sortable: true, wrap: true, selector: row => moment(row.createdAt).format("DD-MM-YYYY") },
        { name: <div style={{ whiteSpace: 'wrap' }}>Project Name</div>, selector: row => row.projectName, wrap: true },
        { name: <div style={{ whiteSpace: 'wrap' }}>Description</div>, selector: row => row.projectDescription, wrap: true },
        { name: <div style={{ whiteSpace: 'wrap' }}>Symbol</div>, selector: row => row.projectSymbol, wrap: true },
        { name: 'Status', selector: row => row.status, sortable: true, wrap: true },
        { name: <div style={{ whiteSpace: 'wrap' }}>Address</div>, selector: row => row.adminAddress, wrap: true },
        { name: <div style={{ whiteSpace: 'wrap' }}>Total Supply</div>, selector: row => row.totalSupply, wrap: true },
        { name: 'Actions', selector: handleActionButtons, wrap: true, grow: 2 },
    ];

    const searchObjects = (e) => {
        const keysToSearch = ['projectName'];
        const searchValue = e.target.value;
        const searchTerm = searchValue?.toLowerCase();

        const matchingObjects = getFormData?.filter(obj => {
            return keysToSearch.some(key => obj[key]?.toString().toLowerCase().includes(searchTerm));
        });
        setFilteredData(matchingObjects);
    };

    useEffect(() => {
        getAllProject();
    }, []);

    useEffect(() => {
        setFilteredData(getFormData);
    }, [getFormData]);


    return (
        <>
            <div id="layoutSidenav_content">
                <main >
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i className="far fa-user"></i></div>
                                            Projects List
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
                                    <input className="form-control " id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={searchObjects} />
                                </div>
                            </div>
                            <div className="card-body mt-3">
                                {getFormData.length === 0 ? <h6 className="ifnoData"><img alt="" src="assets/img/no-data.png" /> <br />No Data Available</h6> :
                                    <div className="table-responsive" width="100%">
                                        <DataTableBase columns={columns} data={filteredData} pagination={true} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <div className="modal" id="edit_banner" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog  alert_modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">
                                Edit Form
                            </h5>
                            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Launchpad Image <small className="text-dark ms-1" >(600X400)</small> </label>
                                    <input className="form-control  form-control-solid" id="EditbannerImg" type="file" name="launchpad_images"
                                        onChange={handleEditInput}
                                    ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Project Name</label>
                                    <input className="form-control  form-control-solid" type="text" placeholder="Enter Sequence" name="projectName"
                                        value={projectName} onChange={handleEditInput}
                                    ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Project Description</label>
                                    <input className="form-control  form-control-solid" type="text" placeholder="Project Name" name="projectDescription"
                                        value={projectDescription} onChange={handleEditInput}
                                    ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Project Symbol</label>
                                    <input className="form-control  form-control-solid" type="text" placeholder="Project Symbol" name="projectSymbol"
                                        value={projectSymbol} onChange={handleEditInput}
                                    ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Total Supply</label>
                                    <input className="form-control  form-control-solid" type="number" placeholder="Project Symbol" name="totalSupply"
                                        value={totalSupply} onChange={handleEditInput}
                                    ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Token Price</label>
                                    <input className="form-control  form-control-solid" type="number" placeholder="Token Price" name="tokenPrice"
                                        value={tokenPrice} onChange={handleEditInput}
                                    ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Start Date (Time in GMT)</label>
                                    <input className="form-control  form-control-solid" type="datetime-local" name="startDate" value={startDate} onChange={handleEditInput} ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">End Date (Time in GMT)</label>
                                    <input className="form-control  form-control-solid" type="datetime-local" name="endDate" value={endDate} onChange={handleEditInput} ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Token Contract Address</label>
                                    <input className="form-control  form-control-solid" type="text" placeholder='tokenContractAddress' name="tokenContractAddress" value={tokenContractAddress} onChange={handleEditInput} ></input>
                                </div>
                                <div className="form-group  mb-3" >
                                    <label className="small mb-1">Admin Address</label>
                                    <input className="form-control  form-control-solid" type="text" placeholder='tokenContractAddress' name="tokenContractAddress" value={adminAddress} onChange={handleEditInput} ></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="small mb-1">
                                        Status
                                    </label>
                                    <select className="form-control  form-control-solid" type="text"
                                        name="status" onChange={handleEditInput}>
                                        <option value="Live">Live</option>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group ">
                                    <button className="btn btn-indigo w-100" type="button"
                                        onClick={() => handleEditForm(userID, launchpad_images, projectName, projectDescription, projectSymbol, totalSupply, tokenPrice, startDate, endDate, tokenContractAddress, status)}  >
                                        Update Form
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default FormList