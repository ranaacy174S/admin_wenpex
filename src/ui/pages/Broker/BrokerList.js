import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const BrokerList = () => {
  const [brokerList, setbrokerList] = useState([]);
  const [allData, setallData] = useState([]);

  const handleCOntractAddress = (row) => {
    return Object.keys(row.contract_address).map((key, value) => <span>{key}: {row.contract_address[key]} </span>)
  };
  const handleDecimalsAddress = (row) => {
    return Object.keys(row.decimals).map((key, value) => <span>{key}: {row.decimals[key]} </span>)
  };


  const brokerColumn = [
    { name: "Date", selector: row => moment(row?.createdAt).format("MMM Do YYYY"), },
    { name: "ID", wrap: true, selector: row => row._id, },
    { name: "Name", selector: row => row.firstName, },
    { name: "Phone", wrap: true, selector: row => row.mobileNumber, },
    { name: "Coin Name", wrap: true, selector: row => row.coinName, },
    { name: "Short Name", wrap: true, selector: row => row.shortName, },
    { name: "Contract Address", wrap: true, selector: handleCOntractAddress },
    { name: "Decimals", wrap: true, selector: handleDecimalsAddress },
  ];

  useEffect(() => {
    getBrokerList()
  }, []);

  const getBrokerList = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.brokerList().then(async (result) => {
      LoaderHelper.loaderStatus(false);
      if (result.success) {
        try {
          setbrokerList(result?.data?.reverse());
          setallData(result?.data);
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage("Something Went Wrong");
      }
    });
  };


  function handleSearch(e) {
    const keysToSearch = ["short_name", "fee", "fee_type", "from_user", "percentage", "from_user", "amount"];
    const searchTerm = e.target.value?.toLowerCase();
    const matchingObjects = allData?.reverse().filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
    setbrokerList(matchingObjects);
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
          <div className="container-xl px-4">
            <div className="page-header-content pt-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <i className="fa fa-dollar-sign"></i>
                    </div>
                    Brokers List
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
                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={handleSearch} />
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-dark btn-sm dropdown-toggle"
                  id="dropdownFadeInUp"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Export{" "}
                </button>
                <div
                  className="dropdown-menu animated--fade-in-up"
                  aria-labelledby="dropdownFadeInUp"
                >
                  <CSVLink data={[]} className="dropdown-item">
                    Export as CSV
                  </CSVLink>
                </div>
              </div>
            </div>
            <div className="table-responsive" width="100%">
              <DataTableBase columns={brokerColumn} data={brokerList} />
            </div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default BrokerList;
