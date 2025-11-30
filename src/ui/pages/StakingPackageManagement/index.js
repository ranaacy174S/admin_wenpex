import React, { useState, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import moment from "moment";
import { $ } from "react-jquery-plugin";

const PackageManagement = () => {
  const [packageList, setPackageList] = useState([]);
  const [minimumAmount, setMinimumAmount] = useState()
  const [maximumAmount, setMaximumAmount] = useState()
  const [monthPer, setMonthPer] = useState()
  const [remark, setRemark] = useState()
  const [status, setStatus] = useState()
  const [id, setId] = useState()
  const [editCurrency, setEditCurrency] = useState()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [breakingPer, setBreakingPer] = useState()
  const [currencyName, setCurrencyName] = useState("");


  const handlePackageList = async (selectPhase) => {
    try {
      LoaderHelper.loaderStatus(true);
      const result = await AuthService.packageList(selectPhase)
      LoaderHelper.loaderStatus(false);
      if (result.success) {
        setPackageList(result.data);
        setCurrencyName(currencyName === '' ? result?.data[0]?.short_name : currencyName)
      }
    } catch (error) {
      LoaderHelper.loaderStatus(false);
      alertErrorMessage(error?.message);
    }
  };

  const handleDeletePackage = async (_id) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.deletePackage(_id).then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          handlePackageList();
          alertSuccessMessage("Package Deleted Successfully")
          setCurrencyName("")
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };

  const editPackage = async (editCurrency, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status, id) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.editPackage(editCurrency, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status, id).then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          $("#edit_modal").modal("hide");
          handlePackageList();
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };


  const handleEditModel = (item) => {
    setEditCurrency(item?.short_name);
    setMinimumAmount(item?.min_amount);
    setMaximumAmount(item?.max_amount);
    setMonthPer(item?.month_percentage);
    setBreakingPer(item?.breaking_percentages);
    setRemark(item?.remark);
    setStatus(item?.status);
    setId(item?._id);
    const date = new Date(item?.stacking_end_date);
    const formattedDatetime = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
    setEndDate(formattedDatetime);
    const date2 = new Date(item?.stacking_start_date);
    const formattedDatetime2 = `${date2.getFullYear()}-${('0' + (date2.getMonth() + 1)).slice(-2)}-${('0' + date2.getDate()).slice(-2)}T${('0' + date2.getHours()).slice(-2)}:${('0' + date2.getMinutes()).slice(-2)}`;
    setStartDate(formattedDatetime2);
    $("#edit_modal").modal("show");
  };

  useEffect(() => {
    handlePackageList();
  }, [])


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
                    Package Management
                  </h1>
                </div>
                <div className="col-3 mt-4">
                  <select
                    className="form-control form-control-solid form-select form-select-dark text-center" id="exampleFormControlSelect1" value={currencyName} onChange={(e) => setCurrencyName(e.target.value)}>
                    <option selected="selected" hidden="hidden">Choose here</option>
                    {packageList.length > 0 ? packageList.map((item, index) => <option key={index}>{item?.short_name}</option>) : undefined}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-xl px-4 mt-n10">
          {packageList.length === 0 ?
            <h6 className="ifnoData">
              <img alt="" src="assets/img/no-data.png" />
              <br />
              No Data Available
            </h6>
            :
            <div className="row">
              {packageList?.map((item, index) => (
                currencyName === item?.short_name &&
                <div className="col-12 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex justify-content-center flex-column p-5 ">
                      <form>
                        <div className="row">
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">
                              Name of Currency
                            </label>
                            <input
                              class="form-control  form-control-solid"
                              value={item?.short_name}
                              name="phaseName"
                            ></input>
                          </div>
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">  Minimum Amount ($)</label>
                            <input
                              class="form-control  form-control-solid"

                              name="min_amount"
                              value={item?.min_amount}
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">  Maximum Amount ($)</label>
                            <input
                              class="form-control  form-control-solid"

                              name="max_amount"
                              value={item?.max_amount}
                            ></input>
                          </div>
                          <div className="form-group  mb-1  col-6">
                            <label class="small mb-1">Month Percentage (%)</label>
                            <input
                              class="form-control  form-control-solid"

                              name="monthPercentage"
                              value={item?.month_percentage}
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">Start Date</label>
                            <input
                              class="form-control  form-control-solid"

                              name="startDate"
                              value={moment(item?.stacking_start_date).format("MMM Do YYYY")}
                            ></input>
                          </div>
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">End Date</label>
                            <input
                              class="form-control  form-control-solid"

                              name="endDate"
                              value={moment(item?.stacking_end_date).format("MMM Do YYYY")}
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">Breaking Percentage</label>
                            <input
                              class="form-control  form-control-solid"

                              name="breaking_percentage"
                              value={item?.breaking_percentages + "%"}
                            ></input>
                          </div>
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">Remark</label>
                            <input
                              class="form-control  form-control-solid"

                              name="remark"
                              value={item?.remark}
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group  mb-1 col-6">
                            <label class="small mb-1">Status</label>
                            <input
                              class="form-control  form-control-solid"
                              name="status"
                              value={item?.status}
                            ></input>
                          </div>
                        </div>
                        <button class="btn btn-indigo btn-inline-block  px-4 mt-2 me-3" type="button"
                          onClick={() => handleEditModel(item)}>Edit
                        </button>
                        <button class="btn btn-danger btn-inline-block  px-4 mt-2" type="button"
                          onClick={() => handleDeletePackage(item?._id)}>
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </main>

      {/* edit modal */}
      <div
        class="modal"
        id="edit_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="edit_modal_modalTitle"
        aria-hidden="true" >

        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Edit Package
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label class="small mb-1">Currency</label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="text"
                    value={editCurrency}
                    onChange={(e) => setEditCurrency(e.target.value)}
                  ></input>
                </div>

                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1"> Minimum Amount ($) </label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="number"
                    onWheelCapture={e => {
                      e.target.blur()
                    }}
                    value={minimumAmount}
                    onChange={(e) => setMinimumAmount(e.target.value)}
                  ></input>
                </div>
                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1"> Maximum Amount ($) </label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="number"
                    onWheelCapture={e => {
                      e.target.blur()
                    }}
                    value={maximumAmount}
                    onChange={(e) => setMaximumAmount(e.target.value)}
                  ></input>
                </div>
                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1"> Month Percentage (%) </label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="number"
                    onWheelCapture={e => {
                      e.target.blur()
                    }}
                    value={monthPer}
                    onChange={(e) => setMonthPer(e.target.value)}
                  ></input>
                </div>
                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1">Start Date</label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  ></input>
                </div>
                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1">End Date</label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  ></input>
                </div>
                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1">Breaking Percentage</label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="number"
                    onWheelCapture={e => {
                      e.target.blur()
                    }}
                    value={breakingPer}
                    onChange={(e) => setBreakingPer(e.target.value)}
                  ></input>
                </div>
                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1"> Remark</label>
                  <input
                    class="form-control  form-control-solid input-copy"
                    type="text"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  ></input>
                </div>
                <div className="form-group  mb-3 position-relative ">
                  <label class="small mb-1">Select Status</label>
                  <select
                    class="form-control  form-control-solid input-copy"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="true">TRUE</option>
                    <option value="false">FALSE</option>
                  </select>
                </div>
                <div className="form-group mb-3 position-relative">
                  <button btn btn-indigo
                    class="btn btn-indigo btn-block w-100 mt-2"
                    type="button"
                    onClick={() =>
                      editPackage(editCurrency, minimumAmount, maximumAmount, monthPer, startDate, endDate, breakingPer, remark, status, id)}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageManagement;
