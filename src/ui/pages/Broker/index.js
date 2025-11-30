import React, { useState } from "react";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import Select from "react-select";

const Broker = () => {
    const [formInput, setformInput] = useState({});
    console.log("🚀 ~ Broker ~ formInput:", formInput)
    const [chain, setChain] = useState([])
    const [contractAdd, setContractAdd] = useState({})
    const [decimal, setDecimal] = useState({})

    // *******Get Contract Details from Input ************//
    const HandleContractInput = (event) => {
        const { name, value } = event.target;
        setContractAdd((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };
    // *******Get Decimal Details from Input ************//
    const HandleDecimalInput = (event) => {
        const { name, value } = event.target;
        setDecimal((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };

    // *******Filter Decimal From Chain ************//
    const updatedDecimal = Object.keys(decimal)
        .filter(key => chain.includes(key))
        .reduce((result, key) => {
            result[key] = decimal[key];
            return result;
        }, {});


    // *******Filter Contract Address From Chain ************//
    const updatedContractAddress = Object.keys(contractAdd)
        .filter(key => chain.includes(key))
        .reduce((result, key) => {
            result[key] = contractAdd[key];
            return result;
        }, {});


    // *******Get Values of All Inputs ************//
    const handleInputChange = (event) => {
        setformInput((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    };


    // *******Reset State After Coin Added ************//
    const resetInputChange = () => {
        setContractAdd({});
        setDecimal({});
        setChain([]);
        setformInput({brokerName:"",coinName:"",email:"",shortName:"",phone:"",password:"",});
    };
    

    // *******Create Coin Function ************//
    const handleAddBroker = async (e) => {
        e.preventDefault()
        if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(formInput.password))){
            alertErrorMessage("Password should contain atleast 8 characters, including  one number and one special character. ")
            return
        }
            if (chain?.length === 0) {
                alertErrorMessage("Please select chain ")
                return
            }

        LoaderHelper.loaderStatus(true);
        await AuthService.createBroker(formInput, chain, updatedContractAddress, updatedDecimal).then(async (result) => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    resetInputChange();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    };



    const chainOptions = [
        { value: 'TRC20', label: 'TRC20' },
        { value: 'ERC20', label: 'ERC20' },
        { value: 'BEP20', label: 'BEP20' },
        { value: 'SOLANA', label: 'SOLANA' },
        { value: 'POLYGON', label: 'POLYGON' },
    ];

    const handleChainChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setChain(selectedValues);
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
                                            <div className="page-header-icon">
                                                <i className="fa fa-prescription"></i>
                                            </div>
                                            Add Broker
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card mb-4">
                                    <div className="card-body d-flex justify-content-center flex-column p-4 ">
                                        <div className="d-flex align-items-center justify-content-start mb-3 ">
                                            <h5 className="mb-0">Add Broker</h5>
                                        </div>
                                        <form onSubmit={(e) => { e.preventDefault(); handleAddBroker(e) }}>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Broker Name<small className="text-danger"> *</small>
                                                </label>
                                                <input className="form-control" required type="text" placeholder="Enter Broker Name" name="brokerName" onChange={handleInputChange} value={formInput?.brokerName} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Broker Email<small className="text-danger"> *</small>
                                                </label>
                                                <input className="form-control" required type="text" placeholder="Enter Broker Email" name="email" onChange={handleInputChange} value={formInput?.email} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Broker Phone<small className="text-danger"> *</small>
                                                </label>
                                                <input className="form-control" required type="number" placeholder="Enter Broker Phone" name="phone" onWheel={(e)=>e.target.blur()} onChange={handleInputChange}  value={formInput?.phone}/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Password<small className="text-danger"> *</small>
                                                </label>
                                                <input className="form-control" required type="text" placeholder="Enter Password" name="password" onChange={handleInputChange}  value={formInput?.password}/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Coin Name<small className="text-danger"> *</small>
                                                </label>
                                                <input className="form-control" required type="text" placeholder="Enter Coin Name" name="coinName" onChange={handleInputChange}  value={formInput?.coinName}/>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Short Name<small className="text-danger"> *</small>
                                                </label>
                                                <input className="form-control" required type="text" placeholder="Enter Short Name" name="shortName" onChange={handleInputChange} value={formInput?.shortName} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="small mb-1">
                                                    Select Chain<small className="text-danger"> *</small>
                                                </label>
                                                <Select required value={chainOptions.filter(option => chain.includes(option.value))} onChange={handleChainChange} options={chainOptions} isMulti />
                                            </div>
                                            <div className="form-group mb-3">
                                                {chain && chain?.map((item, index) => {
                                                    return < React.Fragment key={item}>  <label className="small mb-1">
                                                        {`Enter ${item} Contract Address`}<small className="text-danger"> *</small>
                                                    </label>
                                                        <input required id={index} className="form-control" type="text" placeholder={`Enter ${item} Contract Address`} name={item} onChange={(event) => { HandleContractInput(event) }} />
                                                    </React.Fragment>
                                                })}
                                            </div>
                                            <div className="form-group mb-3">
                                                {chain && chain?.map((item, index) => {
                                                    return <React.Fragment key={item}>  <label className="small mb-1">
                                                        {`Enter ${item} Decimal`}<small className="text-danger"> *</small>
                                                    </label>
                                                        <input required id={index} className="form-control" type="number" placeholder={`Enter ${item} Decimal`}
                                                            name={item} onChange={(event) => { HandleDecimalInput(event) }} />
                                                    </React.Fragment>
                                                })}
                                            </div>

                                            <div className="form-group ">
                                                <button className="btn btn-indigo w-100" type="submit" >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </main >
            </div >


        </>
    );
};

export default Broker;
