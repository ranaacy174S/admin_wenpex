import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            default:
        }
    }

    const handleLogin = async (email, password) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.login(email, password).then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    sessionStorage.setItem("token", result.data.token);
                    sessionStorage.setItem("emailId", result.data.email_or_phone);
                    sessionStorage.setItem("userType", result.data.admin_type);
                    sessionStorage.setItem("userId", result.data.id);
                    sessionStorage.setItem("permissions", JSON.stringify(result?.data?.permissions || []));
                    alertSuccessMessage('Login Successfull!!');
                    navigate('/dashboard/homepage');
                    window.location.reload()
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    };

    useEffect(() => {
        const loginEnter = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleLogin(email, password);
            };
        };
        document.addEventListener('keydown', loginEnter);
        return () => {
            document.removeEventListener('keydown', loginEnter);
        };
    });


    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main className="login-card">
                    <div className="container-xl px-4">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">

                                <div className="card-body p-5 text-center">
                                    <img src="/assets/img/logo-white.svg" className="img-fluid" alt="" width='300' />
                                </div>
                               
                                <div className="card ">
                                    <div className="card-body p-5">
                                        <h2 class=" fs-1 text-center"><strong>Sign in to account</strong></h2>
                                        <p className="text-center"><small>Enter your email &amp; password to login</small></p>
                                        <form>
                                            <div className="mb-3">
                                                <label className="text-gray-600 small" for="emailExample">Email address</label>
                                                <input className="form-control form-control-solid" type="email" name="email" placeholder="" aria-label="Email Address" aria-describedby="emailExample" value={email} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="text-gray-600 small" for="passwordExample">Password</label>
                                                <input className="form-control form-control-solid" type="password" placeholder="" aria-label="Password" name="password" aria-describedby="passwordExample" value={password} onChange={handleInputChange} />
                                            </div>
                                            {/* <div>
                                                <Link className="btn-link text-decoration-none" to="/forgotpassword">Forgot your password?</Link>
                                            </div> */}
                                            <div className="text-center py-3 mt-2">
                                                <button type="button" className="btn btn-block w-100 btn-xl btn-warning btn_admin mt-2 px-5"
                                                    onClick={() => handleLogin(email, password)}>
                                                    Login
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
        </div>
    );
};

export default LoginPage;