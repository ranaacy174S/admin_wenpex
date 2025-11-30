import React, { useState } from 'react'
import LoaderHelper from '../../../customComponent/Loading/LoaderHelper'
import AuthService from '../../../api/services/AuthService'
import { alertErrorMessage, alertSuccessMessage } from '../../../customComponent/CustomAlertMessage'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [launchpad_images, setlaunchpad_images] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectSymbol, setProjectSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');
    const [tokenPrice, setTokenPrice] = useState('');
    const [minInvestment, setMinInvestment] = useState('');
    const [maxInvestment, setMaxInvestment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tokenContractAddress, setTokenContractAddress] = useState('');
    const [adminAddress, setAdminAddress] = useState('');
    const [status, setStatus] = useState('Live');

    const navigate = useNavigate();

    const handleInput = (e) => {
        switch (e.target.name) {
            case 'launchpad_images':
                setlaunchpad_images(e.target.files[0])
                break;
            case 'projectName':
                setProjectName(e.target.value)
                break;
            case 'projectDescription':
                setProjectDescription(e.target.value)
                break;
            case 'projectSymbol':
                setProjectSymbol(e.target.value)
                break;
            case 'totalSupply':
                setTotalSupply(e.target.value)
                break;
            case 'tokenPrice':
                setTokenPrice(e.target.value)
                break;
            case 'minInvestment':
                setMinInvestment(e.target.value)
                break;
            case 'maxInvestment':
                setMaxInvestment(e.target.value)
                break;
            case 'startDate':
                setStartDate(e.target.value)
                break;
            case 'endDate':
                setEndDate(e.target.value)
                break;
            case 'tokenContractAddress':
                setTokenContractAddress(e.target.value)
                break;
            case 'adminAddress':
                setAdminAddress(e.target.value)
                break;
            case 'status':
                setStatus(e.target.value)
                break;

            default:
                break;
        };
    };
    const handleSubmitForm = async (launchpad_images, projectName, projectDescription, projectSymbol, totalSupply, tokenPrice, startDate, endDate, tokenContractAddress, status) => {
        console.log(launchpad_images, projectName, projectDescription, projectSymbol, totalSupply, tokenPrice, startDate, endDate, tokenContractAddress, status);

        if (!launchpad_images || !projectName || !projectDescription || !projectSymbol || !totalSupply || !tokenPrice || !startDate || !endDate || !tokenContractAddress || !status) {
            alertErrorMessage('Fill all required details')
            return
        }
        LoaderHelper.loaderStatus(true);
        const addFormData = new FormData();
        addFormData.append('launchpad_images', launchpad_images);
        addFormData.append('projectName', projectName);
        addFormData.append('projectDescription', projectDescription);
        addFormData.append('projectSymbol', projectSymbol);
        addFormData.append('totalSupply', totalSupply);
        addFormData.append('tokenPrice', tokenPrice);
        addFormData.append('startDate', startDate);
        addFormData.append('endDate', endDate);
        addFormData.append('tokenContractAddress', tokenContractAddress);
        addFormData.append('adminAddress', adminAddress);
        addFormData.append('status', status);

        await AuthService.createProject(addFormData).then(async (result) => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    navigate('/dashboard/formlist')
                } catch (error) {
                    alertErrorMessage(error);
                };
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            };
        });
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
                                            <div className="page-header-icon"><i className="fa fa-image"></i></div>
                                            Add Launchpad Project
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="row" >
                            <div className="col-xl-12">
                                <div className="card mb-4 mb-xl-0">
                                    <div className="card-body d-flex justify-content-center flex-column p-5 ">
                                        <div className="d-flex align-items-center justify-content-start mb-4 ">
                                            <h5 className="mb-0" >Add New Project</h5>
                                        </div>
                                        <form>
                                            <div className="mb-3 form-group">
                                                <label className="small mb-1" >Launchpad Images <small className='text-danger'>*</small></label>
                                                <input className="form-control form-control-solid" type='file' name="launchpad_images" onChange={handleInput} />

                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Project Name<small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="text" placeholder="Project Name" name="projectName"
                                                    value={projectName} onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Project Description  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="text" name="projectDescription" placeholder='Project Description' value={projectDescription} onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Project Symbol  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="text" name="projectSymbol" placeholder='Project Symbol' value={projectSymbol}
                                                    onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Total Supply  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="number"  onWheel={(e) => e.target.blur()} name="totalSupply" placeholder='Total Supply'
                                                    value={totalSupply} onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Token Price  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="number"  onWheel={(e) => e.target.blur()} name="tokenPrice" placeholder='Token Price'
                                                    value={tokenPrice} onChange={handleInput} />
                                            </div>
                                            {/* <div className="form-group  mb-3" >
                                                <label className="small mb-1">Minimum Investment  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="number"  onWheel={(e) => e.target.blur()} name="minInvestment" placeholder='Minimum Investment' value={minInvestment}
                                                    onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Maximum Investment  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="number"  onWheel={(e) => e.target.blur()} name="maxInvestment" placeholder='Maximum Investment' value={maxInvestment}
                                                    onChange={handleInput} />
                                            </div> */}
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Start Date (Time in GMT) <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="datetime-local"name="startDate"
                                                    value={startDate} onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">End Date (Time in GMT) <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid"type="datetime-local" name="endDate"
                                                    value={endDate} onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Token Contact Address  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="text" name="tokenContractAddress" placeholder='Token Contract Address' value={tokenContractAddress}
                                                    onChange={handleInput} />
                                            </div>
                                            <div className="form-group  mb-3" >
                                                <label className="small mb-1">Admin Address  <small className='text-danger'>*</small></label>
                                                <input className="form-control  form-control-solid" type="text" name="adminAddress" placeholder='Admin Address'
                                                    value={adminAddress} onChange={handleInput} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Status
                                                    <small className='text-danger'>*</small></label>
                                                <select className="form-control  form-control-solid" type="text"
                                                    name="status" onChange={handleInput}>
                                                    <option value="Live">Live</option>
                                                    <option value="Upcoming">Upcoming</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                            <div className="form-group d-flex justify-content-center">
                                                <button className="btn btn-indigo w-25" type="button"
                                                    onClick={() => handleSubmitForm(launchpad_images, projectName, projectDescription, projectSymbol, totalSupply, tokenPrice, startDate, endDate, tokenContractAddress, status)}  >
                                                    Submit
                                                </button>
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

export default Add