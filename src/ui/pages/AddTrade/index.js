import React, { useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";

const AddTrade = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');



    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "firstName":
                setFirstName(event.target.value);
                break;
            case "lastName":
                setLastName(event.target.value);
                break;
            case "gender":
                setGender(event.target.value);
                break;
            case "number":
                setNumber(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "address":
                setAddress(event.target.value);
                break;
            default:

        }
    }

    const resetInputChange = () => {
        setFirstName("");
        setLastName("");
        setGender("");
        setNumber("");
        setEmail("");
        setAddress("");
    }

    const handleTrader = async (firstName, lastName, gender, number, email, address) => {
        await AuthService.AddTrade(firstName, lastName, gender, number, email, address).then(async result => {
            if (result.message === "New Trader added successfuly") {
                try {
                    alertSuccessMessage(result.message);
                    resetInputChange();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message);
            }
        })
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
                                        <div className="page-header-icon"><i className="fa fa-wave-square" ></i></div>
                                        Add New Trader
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">Enter New Trader Details</div>
                        <div className="card-body">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputFirstName">First name <em>*</em></label>
                                        <input type="text" className="form-control  form-control-solid" id="inputFirstName" placeholder="Enter your first name" name="firstName" value={firstName} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputLastNames">Last name <em>*</em> </label>
                                        <input className="form-control form-control-solid" id="inputLastNames" type="text" placeholder="Enter your last name" name="lastName" value={lastName} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputBirthday">Gander <em>*</em></label>
                                        <select className="form-control form-control-solid" id="exampleFormControlSelect1" name="gender" value={gender} onChange={handleInputChange}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputEmailAddress">Email</label>
                                        <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" name="email" value={email} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Phone Number</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Number" name="number" value={number} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-12">
                                        <label className="small mb-1" for="inputLocation">Your Address</label>
                                        <textarea className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Address" name="address" value={address} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <button className="btn btn-indigo" type="button" onClick={() => handleTrader(firstName, lastName, gender, number, email, address)} > Submit Details </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddTrade;