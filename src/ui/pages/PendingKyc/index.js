import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import "./style.css";
import VerifyKyc from "../VerifyKyc";
import { CSVLink } from "react-csv";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import moment from "moment";
import { alertErrorMessage, } from "../../../customComponent/CustomAlertMessage";
import DataTableBase from "../../../customComponent/DataTable";

const PendingKyc = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [activeScreen, setActiveScreen] = useState("pending");
  const [userId, setUserId] = useState("");
  const [userKycData, setuserKycData] = useState();

  const linkFollow = (row) => {
    return (
      <button className="verifybtn" onClick={() => { setUserId(row?._id); setuserKycData(row?.kycdata, "clicked"); setActiveScreen("detail") }}>
        View
      </button>
    );
  };

  function imageFormatter(row) {
    return (
      <img style={{ width: "25%", height: "auto" }} className="table-img" src={ApiConfig?.appUrl + row?.user_selfie} alt="Selfie" />
    );
  };

  const columns = [
    { name: "Date", selector: row => moment(row?.createdAt).format("Do MMMM YYYY"), },
    { name: "EmailId", wrap: true, selector: row => row.emailId, },
    { name: "Selfie", selector: imageFormatter, },
    { name: "Action", selector: linkFollow, },
  ];

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getdata().then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setData(result.data.reverse());
          setAllData(result.data);
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
      }
    });
  };


  function searchObjects(e) {
    const keysToSearch = ["firstName", "userId", "emailId", "pancard_number", "dob"];
    const userInput = e.target.value;
    const searchTerm = userInput?.toLowerCase();
    const matchingObjects = allData.filter(obj => {
      return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm));
    });
    setData(matchingObjects);
  }

  return activeScreen === "pending" ? (
    <div id="layoutSidenav_content">
      <main>
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
          <div className="container-xl px-4">
            <div className="page-header-content pt-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <i className=" fa fa-user-slash"></i>
                    </div>
                    Pending Kyc
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
                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={searchObjects} />
              </div>
              <div className="dropdown">
                <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                  <i className="fa fa-download me-3"></i>Export
                </button>
                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp" >
                  <CSVLink data={data} className="dropdown-item">
                    Export as CSV
                  </CSVLink>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive" width="100%">
                <DataTableBase columns={columns} data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <VerifyKyc userId={userId} kycData={userKycData} />
  );
};
export default PendingKyc;
