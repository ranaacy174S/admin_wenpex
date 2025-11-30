import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { $ } from "react-jquery-plugin";
import DataTableBase from "../../../customComponent/DataTable";

const FundsPendingWithdrawal = () => {
  const [fundWithdrawal, setFundWithdrawal] = useState([]);
  const [allData, setAllData] = useState([]);
  const [trHash, setTrHash] = useState('');
  const [id, setId] = useState();
  const [userId, setuserId] = useState();
  const [fee, setFee] = useState();

  const linkFollow = (row) => {
    return (
      <div className="d-flex gap-2">
        <button className="btn btn-success btn-sm" type="button" onClick={() => ShowWithdrawModal(row?._id, row?.user_id, row?.fee)} >
          Approve
        </button>
        <button className=" btn btn-danger btn-sm" type="button" onClick={() => HandleWithdrawalStatus(row?._id, row?.user_id, row?.fee, 'REJECTED', ' ')}>
          Reject
        </button>
      </div>
    );
  };

  const ShowWithdrawModal = (id, userId, fee) => {
    setId(id)
    setuserId(userId)
    setFee(fee)
    $("#funds_modal").modal("show");
  };

  const HandleWithdrawalStatus = async (id, userId, fee, status, Hash) => {
    try {
      LoaderHelper.loaderStatus(true)
      const result = await AuthService.handleFundDenied(id, userId, fee,status, Hash)
      LoaderHelper.loaderStatus(false)
      if (result?.success) {
        $("#funds_modal").modal("hide");
        handleFundWithdrawal();
        setId('');
        setuserId('')
        setTrHash('')
        alertSuccessMessage(result?.message)
      }
      else alertErrorMessage(result?.message)
    } catch (error) {
      LoaderHelper.loaderStatus(false)
      alertErrorMessage(error?.message)
    }
  };

  const columns = [
    { name: "Date", selector: row => moment(row?.createdAt).format("MMM Do YYYY"), },
    { name: "Email Id", wrap: true, selector: row => row.emailId, },
    { name: "Chain", selector: row => row.chain, },
    { name: "Coin Name", wrap: true, selector: row => row.short_name, },
    { name: "User Id", wrap: true, selector: row => row.user_id, },
    { name: "Withdrawal Address", wrap: true, selector: row => row.to_address, },
    { name: "Amount", wrap: true, selector: row => row.amount, },
    { name: "Status", grow: 1.5, selector: linkFollow, },
  ];



  const handleFundWithdrawal = async () => {
    try {
      LoaderHelper.loaderStatus(true);
      const result = await AuthService.PendingWithdrwal()
      LoaderHelper.loaderStatus(false);
      if (result.success) {
        setFundWithdrawal(result.data.reverse());
        setAllData(result.data);
      }
    } catch (error) { LoaderHelper.loaderStatus(false); }
  };

  function handleSearch(e) {
    const keysToSearch = ["emailId", "chain", "short_name", "user_id", "to_address", "amount"];
    const searchTerm = e.target.value?.toLowerCase();
    const matchingObjects = allData?.reverse().filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
    setFundWithdrawal(matchingObjects);
  };

  useEffect(() => {
    handleFundWithdrawal();
  }, []);

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
                        <i className="fa fa-dollar-sign"></i>
                      </div>
                      Pending Withdrawal
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
                  <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Export{" "}
                  </button>
                  <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                    <CSVLink data={fundWithdrawal} className="dropdown-item">
                      Export as CSV
                    </CSVLink>
                  </div>
                </div>
              </div>
              <div className="table-responsive" width="100%">
                <DataTableBase columns={columns} data={fundWithdrawal} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="modal" id="funds_modal" tabindex="-1" role="dialog" aria-labelledby="funds_modal_modalTitle" aria-hidden="true">
        <div className="modal-dialog  alert_modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Debit/Credit
              </h5>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group  mb-3 position-relative ">
                  <label className="small mb-1"> Transaction Hash </label>
                  <input className="form-control  form-control-solid input-copy" type="text" Placeholder="Enter Transaction Hash " value={trHash} onChange={(e) => setTrHash(e.target.value)}></input>
                </div>
                <div className="form-group  mb-3 position-relative">
                  <button className="btn btn-success   btn-block w-100" type="button" onClick={() => HandleWithdrawalStatus(id, userId, fee, 'COMPLETE', trHash)}>
                    Approve
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default FundsPendingWithdrawal;
