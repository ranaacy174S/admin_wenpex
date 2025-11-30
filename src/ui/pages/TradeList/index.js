import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import TraderDetails from "../TraderDetails";
import { CSVLink } from "react-csv";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const TradeList = () => {
  const [activeScreen, setActiveScreen] = useState("userdetail");
  const [userId, setUserId] = useState("");
  const [exportData, setExportData] = useState([]);
  const [allData, setallData] = useState([]);
  const [traderData, settraderData] = useState();

  const linkFollow = (row) => {
    return (
      <div>
        <button className="btn btn-dark btn-sm me-2" onClick={() => { settraderData(row); setUserId(row?._id); setActiveScreen("detail") }} >View</button>
        {row?.status === 'Active' ?
          <button className="btn btn-success btn-sm me-2" onClick={() => { handleStatus(row?.id, 'Inactive') }}>Active</button>
          : <button className="btn btn-danger btn-sm me-2" onClick={() => { handleStatus(row?.id, 'Active') }}>Inactive</button>}
      </div>
    );
  };


  const columns = [
    { name: "Name", sort: true, wrap: true, selector: row => row?.firstName ? row?.firstName + " " + row?.lastName : "----", sortable: false },
    { name: "Email", sort: true, wrap: true, selector: row => row.emailId || "----", },
    { name: "Phone Number", sort: true, selector: row => row.mobileNumber || "----", },
    { name: "Registration Date", sort: true, selector: row => moment(row?.createdAt).format("Do MMMM YYYY") },
    { name: "Action", selector: linkFollow, },
  ];

  useEffect(() => {
    handleExportData();
  }, []);

  const handleStatus = async (_id, status) => {
    await AuthService.updateStatus(_id, status).then(
      async (result) => {
        if (result.success) {
          try {
            handleExportData();
            alertSuccessMessage(result.message);
          } catch (error) {
            alertErrorMessage(error);
          }
        } else {
          alertErrorMessage(result.message);
        }
      }
    );
  };

  const handleExportData = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getExportList().then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setExportData(result?.data.reverse());
          setallData(result?.data);
        } catch (error) {
          alertErrorMessage(error);

        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage("No Data Available");

      }
    });
  };

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filterDate = () => {
    const filteredData = allData.filter((item) => {
      const createdAtDate = new Date(item.createdAt);
      return (
        (!fromDate || createdAtDate >= new Date(fromDate)) &&
        (!toDate || createdAtDate <= new Date(toDate))
      );
    });
    setExportData(filteredData?.reverse())
  }
  const ResetfilterDate = () => {
    setFromDate('')
    setToDate('')
    setExportData(allData)
  };

  function searchObjects(e) {
    const keysToSearch = ["firstName", "lastName", "emailId", "mobileNumber", "_id"];
    const userInput = e.target.value;
    const searchTerm = userInput?.toLowerCase();
    const matchingObjects = allData.filter(obj => {
      return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm));
    });
    setExportData(matchingObjects);
  }

  return activeScreen === "userdetail" ? (
    <div id="layoutSidenav_content">
      <main>
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
          <div className="container-xl px-4">
            <div className="page-header-content pt-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <i className="fa fa-wave-square"></i>
                    </div>
                    Traders List
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-xl px-4 mt-n10">
          <div className="filter_bar">
            <form className="row">
              <div className="mb-3 col ">
                <input type="date" className="form-control form-control-solid" data-provide="datepicker" id="litepickerRangePlugin" name="dateFrom"
                  value={fromDate} onChange={(e) => { setFromDate(e.target.value); }} />
              </div>
              <div className="mb-3 col ">
                <input type="date" className="form-control form-control-solid" data-provide="datepicker" id="litepickerRangePlugin" name="dateTo" value={toDate}
                  onChange={(e) => { setToDate(e.target.value); }} />
              </div>
              <div className="mb-3 col ">
                <div className="row">
                  <div className="col">
                    <button className="btn btn-indigo btn-block w-100" type="button" onClick={filterDate}>
                      Search
                    </button>
                  </div>
                  <div className="col">
                    <button className="btn btn-indigo btn-block w-100" type="button" onClick={ResetfilterDate}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">

              <div className="col-5">
                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={searchObjects} />
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
                  {" "}
                  <i className="fa fa-download me-3"></i> Export
                </button>
                <div
                  className="dropdown-menu animated--fade-in-up"
                  aria-labelledby="dropdownFadeInUp"
                >
                  <CSVLink data={exportData} className="dropdown-item">
                    Export as CSV
                  </CSVLink>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive" width="100%">
                <DataTableBase columns={columns} data={exportData} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <TraderDetails userId={userId} traderData={traderData} />
  );
};

export default TradeList;
